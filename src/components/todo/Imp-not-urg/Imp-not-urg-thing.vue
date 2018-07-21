<template>
  <div class="col-md-4" v-if="item.type == 'imp'">
    <div class="panel panel-default" :class="{ 'panel-success': !item.done}">
      <div class="panel-heading">
        {{ item.title }}
        <span class="glyphicon glyphicon-remove" aria-hidden="true" style=" margin-left: 15px" @click="remove"></span>
        <span v-if="!item.done" class="glyphicon glyphicon-ok" aria-hidden="true" style="margin-left: 15px" @click="done"></span>
<!--         <span v-if="!item.done" class="glyphicon glyphicon-pencil" aria-hidden="true"></span> -->
      </div>
      <div class="panel-body">
        <p style="white-space: pre">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    methods: {
      remove: function() {
        this.$store.dispatch('remove', this.item);
      },
      done: function(){
        this.$store.dispatch('done', this.item);
      }
    },
  }
</script>

<style scoped>
  .panel-heading .glyphicon {
    float: right;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity .5s;
  }

  .panel-heading .glyphicon:hover {
    opacity: 1;
  }
</style>