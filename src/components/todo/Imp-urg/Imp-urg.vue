<template>
  <div>
    <h1>重要紧急</h1>
    <hr>
    <app-imp-urg-thing 
      v-for="(item, index) in items" 
      :key="index" 
      :item="item"></app-imp-urg-thing>
  </div>
</template>

<script>
  import ImpUrgThing from './Imp-urg-thing.vue';
  export default {
    computed: {
      items: function() {
        return this.$store.getters.getItems;
      }
    },
    components: {
      appImpUrgThing: ImpUrgThing
    }
  }
  
</script>