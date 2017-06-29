<template>
  <div class="modal active">
    <div class="modal-overlay"></div>
    <div class="modal-container">
      <div class="modal-header">
        <button class="btn btn-clear float-right" @click="$emit('close')"></button>
        <div class="modal-title">Modify the data</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <div class="panel">
            <div class="panel-header text-center">
              <figure class="avatar avatar-lg">
                <img src="http://oahmwbdom.bkt.clouddn.com/feng201609031802477489.jpg">
              </figure>
              <div class="panel-title">
                <input type="text" v-model="modifyData.name" class="text-center">
              </div>
              <div class="panel-subtitle">THE HULK</div>
            </div>
            <div class="panel-nav">
              <!-- navigation components: tabs, breadcrumbs or pagination -->
            </div>
            <div class="panel-body">
              <div class="tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">E-mail</div>
                  <div class="tile-subtitle">bruce.banner@hulk.com</div>
                </div>
                <div class="tile-action">
                  <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
                </div>
              </div>
              <div class="tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">Skype</div>
                  <div class="tile-subtitle">bruce.banner</div>
                </div>
                <div class="tile-action">
                  <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
                </div>
              </div>
              <div class="tile tile-centered">
                <div class="tile-content">
                  <div class="tile-title">Location</div>
                  <div class="tile-subtitle">Dayton, Ohio</div>
                </div>
                <div class="tile-action">
                  <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
                </div>
              </div>
            </div>
            <div class="panel-footer">
              <!-- buttons or inputs -->
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</template>
<script>

  export default{
    data(){
      return {
        modifyData: {}
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.user.userInfo
      }
    },
    mounted(){
      this.modifyData = Object.assign({}, this.userInfo)
    }
  }
</script>
<style scoped>
  .panel {
    width: 400px;
  }

  input {
    border: 0px;
  }

  .panel-title input {
    color: #50596c;
  }
</style>
