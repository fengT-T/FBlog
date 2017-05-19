<template>
  <div>
    <transition-group
      name="custom-classes-transition"
      enter-active-class="animated lightSpeedIn"
      leave-active-class="animated lightSpeedOut"
    >
      <div class="toast toast-primary"
           v-for="(item, index) in toastList"
           :style="{'top': 60*(index+1)+'px'}"
           :class="item.type"
           :key="index">
        <button class="btn btn-clear float-right" @click="$store.commit('deleteToast',index)"></button>
        {{item.desc}}
      </div>
    </transition-group>
  </div>
</template>
<script>

  export default{
    computed: {
      toastList(){
        return this.$store.state.toast.toastList
      }
    }
  }
</script>
<style scoped="">
  .toast {
    z-index: 401;
    right: -23px;
    margin-right: 40px;
    margin-top: 20px;
    position: fixed;
    width: initial;
  }
</style>
