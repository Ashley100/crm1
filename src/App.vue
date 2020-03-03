<template>
  <div id="app">

    <component :is="layout">
      <router-view/>
    </component>

    <!-- <emptyLayout></emptyLayout> -->
    <!-- <mainLayout></mainLayout>  -->

  </div>
</template>

<script>
import emptyLayout from '@/layouts/empty.layout'
import mainLayout from '@/layouts/main.layout'

export default {
  computed: {
    layout() {
      console.log(this.$route.meta);
      return (this.$route.meta.layout || 'empty') + '-layout';
    }
  },
  components: {
    emptyLayout, mainLayout
  }
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
