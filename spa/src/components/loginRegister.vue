<!--完美的登录注册控件-->
<template>
  <div class="modal active">
    <div class="modal-overlay"></div>
    <div class="modal-container">
      <div class="modal-header">
        <!--关闭完美的登录注册控件-->
        <button class="btn btn-clear float-right" @click="$emit('close')"></button>
        <div class="modal-title">Sign in/Sign up</div>
      </div>
      <div class="modal-body">
        <!--完美潇洒的注释-->
        <!--完美潇洒的切换注册和登录-->
        <div class="content">
          <ul class="tab tab-block">
            <li class="tab-item" :class="{'active':is_login}">
              <a href="javascript:void(0);" @click="is_login = true">Sign in</a>
            </li>
            <li class="tab-item" :class="{'active':!is_login}">
              <a href="javascript:void(0);" @click="is_login = false">Sign up</a>
            </li>
          </ul>
          <!--登录输入控件-->
          <form data-vv-scope="login" @submit.prevent>
            <div v-show="is_login">
              <div class="form-group">
                <!--伟大的vee validate 引入输入控件 'required|min:3|max:20'-->
                <input class="form-input" :class="{'is-error': errors.has('login.name')}" v-validate="'required|min:3|max:20'" data-vv-as="名字" name="name" v-model="loginData.name" type="text" placeholder="名字" />
                <p class="form-input-hint is-success" v-show="errors.has('login.name')"> {{ errors.first('login.name')}}</p>
              </div>
              <!--密码-->
              <div class="form-group">
                <input class="form-input" :class="{'is-error': errors.has('login.password')}" v-validate="'required|min:6|max:16'" data-vv-as="密码" name="password" v-model="loginData.password" type="password" placeholder="密码" />
                <p class="form-input-hint is-success" v-show="errors.has('login.password')"> {{ errors.first('login.password')}}</p>
              </div>
              <div class="form-group">
                <label class="form-switch">
                  <input type="checkbox" v-model="loginData.remember" />
                  <i class="form-icon"></i> Remember me </label>
                <a href="">Forgot password?</a>
              </div>
              <button class="btn btn-primary btn-block" :class="{'loading':isLoading.login}" @click="submit('login')"> Sign in </button>
            </div>
          </form>
          <!--注册控件-->
          <form data-vv-scope="register" @submit.prevent>
            <div v-if="!is_login">
              <div class="form-group">
                <!--name input-->
                <input class="form-input" :class="{'is-error': errors.has('register.name')}" v-validate="'required|min:3|max:20'" data-vv-as="名字" name="name" v-model="registerData.name" type="text" placeholder="你的 名字" />
                <p class="form-input-hint is-success" v-show="errors.has('register.name')"> {{ errors.first('register.name')}}</p>
              </div>
              <!--密码-->
              <div class="form-group">
                <input class="form-input" :class="{'is-error': errors.has('register.password')}" v-validate="'required|min:6|max:16'" data-vv-as="密码" name="password" v-model="registerData.password" type="password" placeholder="你的 密码" />
                <p class="form-input-hint is-success" v-show="errors.has('register.password')"> {{ errors.first('register.password')}}</p>
              </div>
              <!--注册码-->
              <div class="form-group">
                <input class="form-input" :class="{'is-error': errors.has('register.code')}" v-validate="'required'" data-vv-as="注册码" name="code" v-model="registerData.code" type="text" placeholder="你的 注册码" />
                <p class="form-input-hint is-success" v-show="errors.has('register.code')"> {{ errors.first('register.code')}}</p>
              </div>
              <button class="btn btn-primary btn-block" :class="{'loading':isLoading.register}" @click="submit('register')"> Sign up </button>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer"> </div>
    </div>
  </div>
</template>
<script>
// import zh_CN from 'vee-validate/dist/locale/zh_CN'

export default {
  data () {
    return {
      is_login: true,
      registerData: { name: '', password: '', code: '' },
      loginData: { name: '', password: '', remember: false },
      error: {},
      isLoading: {
        register: false,
        login: false
      }
    }
  },
  methods: {
    /**
     * 提交登录或注册
     * @param type "login" "register"
     * @returns {Promise.<void>}
     */
    async submit (type) {
      // 清除报错
      this.$validator.errorBag.clear(type)
      // a.检查错误
      try {
        await this.$validator.validateAll(type)
      } catch (e) {
        return
      }
      // b登录 or 注册
      this.isLoading[type] = true
      try {
        let data = await this.$http.post(`\\${type}`, this[type + 'Data'])
        data = data.data
        // 成功之后处理
        type === 'login' ? this.login(data) : this.register()
      } catch (e) {
        // 后台默认遇到第一条错误就终止，所以一般默认只返回一条错误
        let data = e.response.data
        // ErrorBag 错误约定 http://vee-validate.logaretm.com/api.html#error-bag
        this.$validator.errorBag.add(data[0], data[1], data[2], type)
      }
      this.isLoading[type] = false
    },
    /**
     * 登录成功之后要处理的事情
     * @returns {Promise.<void>}
     */
    async login (userData) {
      // 本地存储用户名和密码
      // 负责的存储明文密码，毕竟谷歌浏览器的密码也是明文存储的，毕竟客户端存储密文没有任何意义
      if (this.loginData.remember) {
        window.localStorage.rememberData = JSON.stringify(this.loginData)
      }
      // 更新用户信息
      this.$store.commit('setUserInfo', userData)
      this.$store.dispatch('incrementToastAndShift', {
        desc: '登录成功',
        'toast-success': true
      })
      this.$emit('close')
    },
    async register () {
      this.$store.dispatch('incrementToastAndShift', {
        desc: '注册成功,请登录',
        'toast-success': true
      })
      this.is_login = true
    }
  }
}
</script>
<style scoped>
.content {
  width: 300px;
}
</style>
