import axios from 'axios';
import router from '../../router';

var state = {
  token: null,
  userId: null,
  email: null,
  databaseId: null
};

var getters = {
  isAuth: function(state) {
    return state.token !== null;
  },
  getDatabaseId: function(state) {
    return state.databaseId;
  },
  getToken: function(state) {
    return state.token;
  },
  getEmail: function(state) {
    return state.email;
  }
};

var mutations = {
  authUser: function(state, userData) {
    console.log('登录成功');
    state.token = userData.token,
    state.userId = userData.userId,
    state.email = userData.email
  },
  clearAuthData: function(state) {
    state.token = null;
    state.userId = null;
    state.email = null;
    state.databaseId = null;
  },
  setDatabaseId: function(state, id) {
    state.databaseId = id;
  }
};

var actions = {
  signup: function(context, formData) {
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDODrd41KZaY-Nn-t1rAhVqDne4HDCgyQs', {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true
    })
        .then(function(res) {
          console.log('注册成功', res);
          var now =  new Date();
          var expirationDate = new Date(now.getTime() + res.data.expiresIn*1000);
          var authData = {
            token: res.data.idToken,
            userId: res.data.localId,
            email: res.data.email,
            expirationDate: expirationDate
          };
          context.commit('authUser', authData);
          context.dispatch('storeUserToDatabase', formData);
          context.dispatch('setLocalStorageToken', authData);
          context.dispatch('setLogoutTimer', res.data.expiresIn);
          context.dispatch('getDatabaseId');
          context.dispatch('getItemsFromDatabase');
          router.replace('/');
        })
        .catch(function(error) {console.log(error)});
  },
  signin: function(context, formData) {
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDODrd41KZaY-Nn-t1rAhVqDne4HDCgyQs', {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true
    })
        .then(function(res) {
          console.log('登陆成功', res);
          var now =  new Date();
          var expirationDate = new Date(now.getTime() + res.data.expiresIn*1000);
          var authData = {
            token: res.data.idToken,
            userId: res.data.localId,
            email: res.data.email,
            expirationDate: expirationDate
          };
          context.commit('authUser', authData);
          context.dispatch('setLocalStorageToken', authData);
          context.dispatch('setLogoutTimer', res.data.expiresIn);
          context.dispatch('getDatabaseId');
          context.dispatch('getItemsFromDatabase');
          router.replace('/');
        })
  },

  storeUserToDatabase: function(context, formData) {
    if (!context.state.token) {
      return;
    }
    axios.post('https://vue-todo-list-e9b66.firebaseio.com/user.json' + '?auth=' + context.state.token, formData)
        .then(function(res) {
          console.log('用户信息已经存储到数据库中', res);
        })
        .catch(function(error) {console.log(error)});
  },
  setLocalStorageToken: function(context, formData) {
    localStorage.setItem('token', formData.token);
    localStorage.setItem('userId', formData.userId);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('expirationDate', formData.expirationDate);
  },
  setLogoutTimer: function(context, expirationTime) {
    setTimeout(function() {
     context.commit('clearAuthData'); 
    }, expirationTime * 1000);
  },
  logout: function(context) {
    context.commit('clearAuthData');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('expirationDate');
    router.replace('/signin'); 
  },
  tryAutoLogin: function(context) {
    console.log('尝试登录');
    var token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    var now = new Date();
    var expirationDate = localStorage.getItem('expirationDate');
    if (now >= expirationDate) {
      return;
    }

    var userId = localStorage.getItem('userId');
    var email = localStorage.getItem('email');
    context.commit('authUser', {
      token: token,
      userId: userId,
      email: email
    });
    context.dispatch('getDatabaseId');
    context.dispatch('getItemsFromDatabase');
  },
  getDatabaseId: function(context) {
    axios.get('https://vue-todo-list-e9b66.firebaseio.com/user.json?' + 'auth=' + context.state.token)
        .then(function(res) {
          console.log('获取数据库数据', res.data);
          for (var key in res.data) {
            if (res.data[key].email == context.state.email) {
              context.commit('setDatabaseId', key);
              break;
            }
          }
        });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}