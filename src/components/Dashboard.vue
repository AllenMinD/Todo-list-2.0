<template>
  <div>
    <h1>Dashboard</h1>
    <p>当前还有重要、不紧急的事情： {{ count.imp }} 件</p>
    <p>当前还有重要、紧急的事情： {{ count.impAndUrg }} 件</p>
    <p>当前还有紧急、不重要的事情： {{ count.urg }} 件</p>
    <p>当前还有不重要、不紧急的事情： {{ count.notImpNotUrg }} 件</p>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        count: {
          imp: 0,
          urg: 0,
          impAndUrg: 0,
          notImpNotUrg: 0
        }
      }
    },
    created: function() {
      var items = this.$store.getters.getItems;
      console.log(items);
      for (var i=0, len=items.length; i<len; i++) {
        if (items[i].type == 'imp' && items[i].done == false) {
          this.count.imp++;
        } else if (items[i].type == 'urg' && items[i].done == false) {
          this.count.urg++;
        } else if (items[i].type == 'impandurg' && items[i].done == false) {
          this.count.impAndUrg++;
        } else if (items[i].type == 'notimpnoturg' && items[i].done == false) {
          this.count.notImpNotUrg++;
        }
      }
    }
  }
</script>