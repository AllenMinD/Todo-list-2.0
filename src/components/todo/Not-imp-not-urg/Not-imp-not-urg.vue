<template>
  <div>
    <h1>不重要不紧急</h1>
    <hr>
    <app-not-imp-not-urg-thing 
      v-for="(item, index) in items" 
      :key="index" 
      :item="item"></app-not-imp-not-urg-thing>
  </div>
</template>

<script>
  import NotImpNotUrg from './Not-imp-not-urg-thing.vue';
  export default {
    computed: {
      items: function() {
        return this.$store.getters.getItems;
      }
    },
    components: {
      appNotImpNotUrgThing: NotImpNotUrg
    }
  }
  
</script>