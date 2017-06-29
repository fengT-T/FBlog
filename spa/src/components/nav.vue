<!-- 这个是导航栏-->
<!--但是用户自动登录逻辑也在里面-->
<template>
  <div>
    <header class="navbar nav">
      <section class="navbar-section">
        <a href="#/" class="navbar-brand mr-10 nav-left">
          <img src="http://blogstatic-1252075019.cosgz.myqcloud.com/static/logo.png" class="logo">
          <span class="blog_title">FBlog</span>
        </a>

        <button class="btn btn-link">
          <div class="dropdown">
            <a class="btn btn-link dropdown-toggle" tabindex="0">
              <i class="icon icon-bookmark"></i>
              {{label}}
              <i class="icon icon-caret"></i></a>
            <ul class="menu">
              <li class="menu-item" v-for="item in labelList">
                <a :href="'#/list/'+item" @click="label = item">
                  {{item}}
                </a>
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
        <router-link to="/user">
          <figure v-show="userInfo.name" @click="show_modify = true" class="avatar">
            <img v-lazy="userInfo.headImgUrl+'?imageView2/1/w/200/h/200/interlace/1/q/75|imageslim'"/>
          </figure>
        </router-link>
      </section>
    </header>
    <!--登录注册控件-->
    <login-register v-show="show_login"
                    @close="show_login=false"
    ></login-register>
  </div>
</template>
<script>
  import loginRegister from './loginRegister.vue'
  import userInfoModify from './userInfoModify.vue'
  export default{
    data(){
      return {
        show_login: false,
        label:"all",
        labelList:[
          'HTML','css','JavaScript','all'
        ]
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.user.userInfo
      }
    },
    components: {
      loginRegister, userInfoModify
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
          localStorage.removeItem("rememberData")
        }
      }
    }
  }
</script>
<style scoped>
  .nav {
    padding-top: 30px;
    max-width: 1000px!important;
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
