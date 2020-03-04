<template>
<!--  -->

  <div class="app-main-layout">

    <navBar @burgerMenuClick="isOpen = !isOpen"/>

    <sideBar v-if="isOpen"/>


    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link tag="a" class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>

  </div>

<!--  -->
</template>


<script>
import navBar from '@/components/app/navbar';
import sideBar from '@/components/app/sidebar';


export default {
  name: 'main-layout',
  data: () => ({ isOpen: true }),
  components: {
    navBar, sideBar
  }
}
</script>