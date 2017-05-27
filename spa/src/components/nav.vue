<!-- 这个是导航栏-->
<template>
  <div>
    <header class="navbar nav">
      <section class="navbar-section">
        <a href="/" class="navbar-brand mr-10 nav-left">
          <img src="/static/logo.png" class="logo">
          <span class="blog_title">FBlog</span>
        </a>

        <button class="btn btn-link">
          <div class="dropdown">
            <a class="btn btn-link dropdown-toggle" tabindex="0">
              <i class="icon icon-bookmark"></i>
              Label
              <i class="icon icon-caret"></i></a>
            <ul class="menu">
              <li class="menu-item">
                <router-link to="/list/HTML">
                  HTML
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/list/css">
                  css
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/list/JavaScript">
                  JavaScript
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/list/all">
                  All
                </router-link>
              </li>
            </ul>
          </div>
        </button>
        <a href="" class="btn btn-link nav-left">About</a>
      </section>
      <section class="navbar-section">
        <div class="input-group input-inline">
          <button v-show="!userInfo.name" @click="show_login = true" class="btn btn-link">Sign in/Sgin up</button>
        </div>
        <figure v-show="userInfo.name" class="avatar">
          <img v-lazy="userInfo.headImgUrl"/>
        </figure>
      </section>
    </header>
    <login-register v-show="show_login"
                    @close="show_login=false"
    ></login-register>
  </div>
</template>
<script>
  import loginRegister from './loginRegister.vue'

  export default{
    data(){
      return {
        show_login: false,
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.user.userInfo
      }
    },
    components: {
      loginRegister
    },
    /**
     * 自动登录
     * @returns {Promise.<void>}
     */
    async mounted(){
      //本地存储密码 和 session存储是否登录
      if (localStorage.rememberData && !this.userInfo.name) {
        try {
          let data = await this.$http.post('/login', JSON.parse(localStorage.rememberData))
          this.$store.commit("setUserInfo", data.data)
        } catch (e) {
          //可能设置了恶意值，给无情清除
          localStorage.removeKey("rememberData")
        }
      }
    }
  }
</script>
<style scoped>
  .nav {
    padding-top: 30px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  img.logo {
    width: 30px;
  }

  .dropdown {
    z-index: 101;
    text-align: left;
  }

  .dropdown {
    margin-top: -7px;
  }

  .blog_title {
    font-size: 20px;
    position: relative;
    top: -5px;
  }

  .dropdown-toggle {
    margin-top: -5px;
  }
</style>
