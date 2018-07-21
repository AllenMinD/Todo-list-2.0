<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-sm-18 col-md-12">
          <transition name="slide" mode="out-in" type="animation" appear>
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  export default {
    components: {
      appHeader: Header
    },
    created: function() {
      this.$store.dispatch('tryAutoLogin');
    }
  };
</script>

<style>
  .white-box {
    border-radius: 10px;
    box-shadow: 0 0 10px #999;
    padding: 30px 20px;
    width: 30%;
    margin: auto;
  }

  .slide-enter,
  .slide-leave-to {
    opacity: 0;
  }

  .slide-enter-active {
    animation: slide-in .3s ease-out forwards;
    transition: opacity .3s;
  }

  .slide-leave-active {
    animation: slide-out .3s ease-out forwards;
    transition: opacity .3s;
  }

  @keyframes slide-in {
    from {
      transform: translateY(-30px);
    }
    to {
      transform:  translateY(0px);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform:  translateY(-30px);
    }
  }
</style>
