<template>
  <div id="app">
    <F-Toast></F-Toast>
    <f-nav></f-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import FNav from "./components/nav.vue"
  import FToast from "./components/toast.vue"
  export default {
    name: 'app',
    components: {
      FNav,
      FToast
    }
  }
</script>

<style>

  .light {
    color: rgba(0, 0, 0, .44);
  }

  a {
    transform: translateZ(0);
  }

  a:before {
    content: '';
    position: absolute;
    z-index: -1;
    height: 2px;
    bottom: 0;
    left: 51%;
    right: 51%;
    background: #c05b4d;
    transition-duration: 0.2s;
    transition-property: right, left;
    transition-timing-function: ease-out;
  }
</style>
