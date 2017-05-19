<template>
  <div id="app">
    <F-Toast></F-Toast>
    <router-view></router-view>
  </div>
</template>

<script>
  import toast from "./components/toast.vue"
export default {
  name: 'app',
  components:{
    'F-Toast':toast
  }
}
</script>

<style>
  a{
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
