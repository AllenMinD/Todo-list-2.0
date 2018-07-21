<template>
  <div>
    <h1>Home</h1>
    <p>今天日期： {{ nowDate }}</p>
    <div v-if="!isAuth">
      您还没有登录，请
      <router-link to="/signin" tag="button" class="btn btn-primary">登录</router-link>
      或
      <router-link to="/signup" tag="button" class="btn btn-primary">注册</router-link>
    </div>
    <form v-if="isAuth">
      <div class="form-group" style="width: 40%">
        <label>Title:</label>
        <input type="text" v-model="title" class="form-control">
      </div>
      <div class="form-group">
        <label>Todo: </label>
        <textarea class="form-control" rows="6" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <label>Type:</label>
        <div class="radio">
        <label>
            <input type="radio" name="optionsRadios" id="optionsRadios1" value="imp" v-model="type">
            重要不紧急
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="radio" name="optionsRadios" id="optionsRadios2" value="impandurg" v-model="type">
            重要紧急
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="radio" name="optionsRadios" id="optionsRadios3" value="urg"  v-model="type">
            紧急不重要
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="radio" name="optionsRadios" id="optionsRadios4" value="notimpnoturg"  v-model="type">
            不重要不紧急
          </label>
        </div>
      </div>
      <button class="btn btn-primary" @click.enter.prevent="submit">提交</button>
    </form>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        nowDate: '',
        title: '',
        content: '',
        type: 'imp'
      };
    },
    computed: {
      isAuth: function() {
        return this.$store.getters.isAuth;
      }
    },
    methods: {
      submit: function() {
        var formData = {
          title: this.title,
          content: this.content,
          type: this.type,
          done: false
        }
        // console.log(formData);
        this.$store.dispatch('add', formData);
        alert('提交成功');
        this.title = '';
        this.content = '';
        this.type = 'imp';
      }
    },
    created: function() {
      var that = this;
      that.nowDate = new Date().toLocaleString();
      setInterval(function() {
        that.nowDate = new Date().toLocaleString();
      }, 1000);
    }
  }
</script>

<style></style>