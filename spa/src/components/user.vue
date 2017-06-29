<template>
  <div class="container">
    <div class="columns">
      <div class="column col-3">
        <ul class="menu">
          <li class="menu-item">
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img v-lazy="userInfo.headImgUrl+'?imageView2/1/w/200/h/200/interlace/1/q/75|imageslim'" class="avatar">
              </div>
              <div class="tile-content">
                {{userInfo.name}}
              </div>
            </div>
            <p class="light">{{userInfo.desc}}</p>
          </li>
          <li class="divider"></li>
          <li class="menu-item">
            <a href="javascript:void(0);" @click="select = 'Settings'" :class="{'active':select === 'Settings'}">
              Settings
            </a>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" @click="select = 'Blog'" :class="{'active':select === 'Blog'}">
              Blog
            </a>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" @click="select = 'ImageUpload'" :class="{'active':select === 'ImageUpload'}">
              Image Upload
            </a>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" @click="select = 'Create'" :class="{'active':select === 'Create'}">
              Create
            </a>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" @click="logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
      <div class="column col-8">
        <!--用户设置-->
        <div v-show="select === 'Settings'">
          <div class="form-group">
            <label class="form-label">New Name</label>
            <input class="form-input" type="text" placeholder="New Name" :class="{'is-error': errors.has('name')}" v-validate="'min:3|max:20'"
              data-vv-as="名字" name="name" v-model="modifyData.name" />
            <p class="form-input-hint is-success" v-show="errors.has('name')">
              {{ errors.first('name')}}
            </p>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input class="form-input" type="password" placeholder="New Password" :class="{'is-error': errors.has('password')}" v-validate="'required|min:6|max:16'"
              data-vv-as="密码" name="password" v-model="modifyData.password" />
            <p class="form-input-hint is-success" v-show="errors.has('password')">
              {{ errors.first('password')}}
            </p>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <input class="form-input" type="text" :class="{'is-error': errors.has('desc')}" v-validate="'required|max:100'" data-vv-as="描述" name="desc"
              placeholder="New Description" v-model="modifyData.desc" />
            <p class="form-input-hint is-success" v-show="errors.has('desc')">
              {{ errors.first('desc')}}
            </p>
          </div>
          <div class="form-group">
            <label class="form-label">headImgUrl</label>
            <input class="form-input" type="text" :class="{'is-error': errors.has('headImgUrl')}" v-validate="'required'" data-vv-as="描述" name="headImgUrl"
              placeholder="headImgUrl" v-model="modifyData.headImgUrl" />
            <p class="form-input-hint is-success" v-show="errors.has('headImgUrl')">
              {{ errors.first('headImgUrl')}}
            </p>
          </div>
          <button class="btn btn-block" @click="userInfoModify">Submit</button>
        </div>
        <!--这个是博客文章-->
        <div v-show="select === 'Blog'">
          <aritle-item v-for="item in articleList" :article="item" :key="item._id"></aritle-item>
          <div class="text-center">
            <!--loading状态不能再点击，有点厉害的这个css框架-->
            <button class="btn btn-link" v-show="!isEnd" :class="{'loading':loading}" @click="moreBlog">More</button>
          </div>
        </div>
        <!--图片上传-->
        <div v-show="select === 'ImageUpload'">
          <div class="columns uploadImg">
            <div class="column col-3" v-for="item in imageList">
              <img v-lazy="item.url+'?imageView2/1/w/200/h/200/interlace/1/q/75|imageslim'" v-show="item.isFinish" alt="">
              <progress v-show="!item.isFinish" class="progress" :value="item.progress" max="100"></progress>
            </div>
          </div>
        </div>
        <!--编辑器-->
        <div v-show="select === 'Create'">
          <div class="form-group">
            <input class="form-input" v-model="edit.data.title" type="text" placeholder="Title" />
          </div>
          <div class="form-group">
            <textarea class="form-input" v-model="edit.data.summary" type="text" placeholder="Summary"></textarea>
          </div>
          <div class="form-group">
            <textarea class="form-input" v-model="edit.data.content" placeholder="Just input you html" rows="15"></textarea>
          </div>
          <div class="form-group">
            <input class="form-input" v-model="edit.data.tag" type="text" placeholder="Tag 多个标签使用;分割" /> Tag:
            <span class="label" v-for="item in tagList">{{item}}</span>
          </div>
          <div class="popover popover-top form-group">
            <button class="btn btn-link">Some Tips</button>
            <div class="popover-container">
              <div class="card">
                <div class="card-header">
                  <div class="card-title">一些说明</div>
                  <div class="card-subtitle">希望使用之前能够看完</div>
                </div>
                <div class="card-body">
                  <ol>
                    <li>这个编辑器可以随意输入HTML,包括危险的包含xss的JavaScript的代码， 之所以允许这样做是因为这是一个web技术博客，需要在页面执行JavaScript
                    </li>
                    <li>由于这个编辑器的存在，这个博客仅仅适用于个人和你信任（不喜欢捣乱的）的小伙伴</li>
                    <li>最后也是最重要的一点，你可以拖动（多个）图片到浏览器上传到7牛云</li>
                  </ol>
                </div>
                <div class="card-footer">
                  By Feng
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-block" :class="{'loading':edit.loading}" @click="createArticle">submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import aritleItem from "./articleItem.vue"
  import { mapGetters, mapState } from 'vuex'

  export default {
    data() {
      return {
        select: "Settings",
        modifyData: {},
        loading: false,
        edit: {
          data: {
            title: "", summary: "", content: "", tag: ""
          },
          loading: false
        },
        imageList: []
      }
    },
    components: {
      aritleItem
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo,
        articleList: state => state.user.articleList,
        page: state => state.user.page,
        isEnd: state => state.user.isEnd,
      }),
      tagList: {
        set(newValue) {
          newValue.reduce((acc, val) => {
            return `${acc};${val}`
          })
        },
        get() {
          return this.edit.data.tag.split(";")
        }
      }
    },
    methods: {
      async createArticle() {
        this.edit.loading = true
        await this.$http.post("/user/createArticle", this.edit.data)
        this.edit.loading = false
      },
      async userInfoModify() {
        this.$validator.errorBag.clear()  //清除报错
        try {                             //a.检查错误
          await this.$validator.validateAll()
        } catch (e) {
          return
        }
        try {
          let user_data = (await this.$http.post("/user/modify", this.modifyData)).data
          this.$store.dispatch('incrementToastAndShift', {
            desc: "修改成功",
            'toast-success': true
          })
          this.$store.commit("setUserInfo", user_data)
          localStorage.removeItem("rememberData")    //清除登录数据算了，反正我怠惰
          this.modifyData = {}
        } catch (e) {
          let data = e.response.data
          this.$validator.errorBag.add(data[0], data[1], data[2])
        }
      },
      /**
       * 登出，数据统统删掉，包括localStorage和$store和sessionStorage
       */
      async logout() {
        await this.$http.get("/user/logout")
        localStorage.removeItem("rememberData")
        this.$store.commit("setUserInfo", {})
        this.$router.push("/")
      },
      /**
       * 简单的获取下一页的数据
       */
      async moreBlog() {
        this.loading = true
        let list = await this.$http.get(`/article/userArticleList?userId=${this.userInfo._id}&offset=${(this.page - 1) * 5}`)
        this.loading = false
        this.$store.commit("addUserArticleList", list.data)
        if (list.data.length < 5) {
          this.$store.commit("setUserArticleListEnd")
        }
      }
    },
    /**
    * 挂载前，主要是注册监听拖动事件
    **/
    async mounted() {
      if (!this.articleList.length) {
        this.moreBlog()
      }
      window.document.addEventListener("drop", async (evt) => {
        evt.stopPropagation()//禁止默认处理方法
        evt.preventDefault()//禁止默认处理方法
        //以下部分JavaScript不好的同学慎入，可能会造成晕厥
        let fileList = evt.dataTransfer.files; // 文件列表,先保存一份再说，免得evt对象有变
        if (!fileList.length) {//说明根本没有拖动文件，也就为空了
          return
        }
        fileList = Array.from(fileList)//FileList，不管了转成数组再说
        let upload = (await this.$http.get("/user/uploadToken")).data//1 获取7牛token
        fileList.forEach((ele, index, arr) => {
          let POST = this.$http.post//把post方法传给下面的imageUpload.upload闭包，你懂的
          let imageUpload = {
            isFinish: false,
            progress: 0,
            url: "",
            upload: async function () {//注意了this指向调用他的imageUpload对象
              let data = new FormData()
              data.append("file", ele)
              data.append("token", upload.token)
              try {
                let backData = (await POST(upload.uploadUrl, data, {//2
                  onUploadProgress: (event) => {//加载进度
                    if (event.lengthComputable) {//这个是啥我也不想知道，但是这是MDN推荐写法
                      this.progress = (event.loaded / event.total * 100 | 0)
                    }
                  }
                })).data
                this.url = `${upload.bucketUrl}/${backData.key}`
              } catch (e) {
                console.error(e)//我也不知道啊怎么处理啊！alert然后重新上传才是正解
                alert("上传失败了！")
              }
              this.isFinish = true
            }
          }
          this.imageList.push(imageUpload)
          imageUpload.upload()
        })
      })
      window.document.addEventListener("dragover", function (evt) {
        evt.stopPropagation()
        evt.preventDefault()
      })
    }
  }

</script>
<style>
  .container {
    width: 80%;
    max-width: 1000px;
    margin-top: 40px;
  }

  .article-item {
    margin-top: 10px;
  }

  .pagination {
    margin: 0 auto;
    width: 200px;
  }

  .col-8 {
    margin-left: 30px;
  }
</style>