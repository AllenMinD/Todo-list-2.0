<template>
  <div>
    <h1>紧急不重要</h1>
    <hr>
    <app-not-imp-urg-thing 
      v-for="(item, index) in items" 
      :key="index" 
      :item="item"></app-not-imp-urg-thing>
  </div>
</template>

<script>
  import NotImpUrgThing from './Not-imp-urg-thing.vue';
  export default {
    computed: {
      items: function() {
        return this.$store.getters.getItems;
      }
    },
    components: {
      appNotImpUrgThing: NotImpUrgThing
    }
  }
  
</script>