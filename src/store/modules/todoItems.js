import axios from 'axios';

var state = {
  Items: []
};

var getters = {
  getItems: function(state) {
    return state.Items;
  }
};

var mutations = {
  removeItem: function(state, index) {
    state.Items.splice(index, 1);
  },
  doneItem: function(state, index) {
    var temp = state.Items[index];
    temp.done = true;
    state.Items.splice(index, 1);
    state.Items.push(temp);
  },
  addItem: function(state, item) {
    state.Items.push(item);
  },
  initItems: function(state, items) {
    state.Items = items;
  }
};

var actions = {
  // 增
  add: function(context, item) {
    context.commit('addItem', item);
  },

  // 改

  // 删
  remove: function(context, item) {
    context.commit('removeItem', context.state.Items.indexOf(item));
  },

  // 未做完 -> 做完
  done: function(context, item) {
    context.commit('doneItem', context.state.Items.indexOf(item));
  },

  // 上传事件
  upload: function(context) {
    axios.patch('https://vue-todo-list-e9b66.firebaseio.com/user/' + context.getters.getDatabaseId  + '/.json' + '?auth=' + context.getters.getToken, {
      items: context.state.Items
    }).then(function(res) {
      console.log('上传成功', res);
    }).catch(function(error) {
      console.log(error);
    });
  },

  // 获取事件
  getItemsFromDatabase: function(context) {
    axios.get('https://vue-todo-list-e9b66.firebaseio.com/user.json' + '?auth=' + context.getters.getToken)
          .then(function(res) {
            console.log('获取到数据库的用户列表', res);
            for (var key in res.data) {
              if (key == context.getters.getDatabaseId) {
                context.commit('initItems', res.data[key].items);
              }
            }
          }).catch(function(error) {console.log(error)});
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}