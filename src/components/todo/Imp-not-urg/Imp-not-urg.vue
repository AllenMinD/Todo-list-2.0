<template>
  <div>
    <h1>重要不紧急</h1>
    <hr>
    <app-imp-not-urg-thing 
      v-for="(item, index) in items" 
      :key="index" 
      :item="item"></app-imp-not-urg-thing>
  </div>
</template>

<script>
  import ImpNotUrgThing from './Imp-not-urg-thing.vue';
  export default {
    computed: {
      items: function() {
        return this.$store.getters.getItems;
      }
    },
    components: {
      appImpNotUrgThing: ImpNotUrgThing
    }
  }
  
</script>