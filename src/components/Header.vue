<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Todo</router-link>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <router-link v-if="auth" tag="li" to="/todo/impnoturg" active-class="active"><a>重要不紧急</a></router-link>
          <router-link v-if="auth" tag="li" to="/todo/impurg" active-class="active"><a>重要紧急</a></router-link>
          <router-link v-if="auth" tag="li" to="/todo/notimpurg" active-class="active"><a>紧急不重要</a></router-link>
          <router-link v-if="auth" tag="li" to="/todo/notimpnoturg" active-class="active"><a>不重要不紧急</a></router-link>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li v-if="!auth"><router-link tag="button" to="/signin" active-class="btn-primary" type="button" class="btn btn-default navbar-btn">登录</router-link></li>
          <li v-if="!auth"><router-link tag="button" to="/signup" active-class="btn-primary" type="button" class="btn btn-default navbar-btn">注册</router-link></li>
          <li v-if="auth"><router-link tag="button" to="/dashboard" active-class="btn-primary" type="button" class="btn btn-default navbar-btn">{{ dash }}</router-link></li>
          <li v-if="auth"><button type="button" class="btn btn-success navbar-btn" @click="upload">上传当前状态</button></li>
          <li v-if="auth"><button type="button" class="btn btn-danger navbar-btn" @click="logout">注销</button></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  export default {
    methods: {
      logout: function() {
        this.$store.dispatch('logout');
      },
      upload: function() {
        this.$store.dispatch('upload');
      }
    },
    computed: {
      auth: function() {
        return this.$store.getters.isAuth;
      },
      dash: function() {
        return this.$store.getters.getEmail;
      }
    }
  }
</script>

<style></style>