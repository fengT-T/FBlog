<template>
  <div class="container">
    <div class="columns user-info">
      <div class="column col-10">
        <h3>{{userInfo.name}}</h3>
        <h6>{{userInfo.desc}}</h6>
      </div>
      <div class="column col-2">
        <figure class="avatar avatar-xl">
          <img v-lazy="userInfo.headImgUrl+'?imageView2/1/w/200/h/200/interlace/1/q/75|imageslim'" /> </figure>
      </div>
    </div>
    <div class="article-list">
      <article-item v-for="item in articleList" :article="item" :key="item._id"></article-item>
      <div class="big-divider"></div>
      <div class="loading" v-show="isLoading"></div>
    </div>
    <div class="divider text-center" data-content="没有了" v-show="isEnd"></div>
  </div>
</template>
<script>
import articleItem from './articleItem.vue'

export default {
  data () {
    return {
      userInfo: {},
      isLoading: false,
      isEnd: false,
      articleList: [],
      page: 1
    }
  },
  components: {
    articleItem
  },
  methods: {
    async getUserInfo () {
      this.userInfo = (await this.$http.get(`/userOpen/info?id=${this.$route.params.id}`)).data
    },
    async more () {
      if (this.isLoading || this.isEnd) { // 加载中和截止不触发
        return
      }
      this.isLoading = true
      let list = (await this.$http.get(`/article/userArticleList?userId=${this.$route.params.id}&offset=${(this.page - 1) * 5}`)).data
      this.articleList = this.articleList.concat(list)
      this.page ++
      this.isLoading = false
      if (list.length < 5) {
        this.isEnd = true
      }
    }
  },
  mounted () {
    this.getUserInfo()
    this.more()
    window.addEventListener('scroll', (e) => {
      let offet = document.body.scrollTop + document.documentElement.clientHeight
      let height = document.documentElement.offsetHeight
      if ((height - offet) <= 10) {
        this.more()
      }
    })
  }
}
</script>
<style scoped>
.container {
  max-width: 600px;
}

.user-info {
  margin-top: 40px;
}

h3 span {
  font-size: 0.6em;
}

.article-item {
  margin-top: 60px;
}

.article-list {
  margin-bottom: 60px;
}
</style>