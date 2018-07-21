<template>
  <div>
    <h1>注册</h1>
    <hr>
    <form class="white-box">
      <div class="form-group">
        <label>邮箱：</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>密码：</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="form-group">
        <label>重复密码：</label>
        <input type="password" class="form-control" v-model="repassword">
      </div>
      <button class="btn btn-primary" @click.enter.prevent="submit">注册</button>
    </form>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        email: '',
        password: '',
        repassword: ''
      }
    },
    methods: {
      submit: function() {
        var formData = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('signup', formData);
      }
    }
  }
</script>
