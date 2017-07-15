<template>
  <div class="article-list">
    <article-item v-for="item in articleList" :article="item" :key="item._id"></article-item>
    <div class="big-divider"></div>
    <div class="loading" v-show="isLoading"></div>
    <div class="divider text-center" data-content="没有了" v-show="isEnd"></div>
  </div>
</template>
<script>
import articleItem from './articleItem.vue'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    articleItem
  },
  computed: {
    type () {
      return this.$route.params.type
    },
    articleList () {
      return this.$store.state.articleList.articleList[this.type]
    },
    isEnd () {
      return this.$store.state.articleList.isEnd[this.type]
    }
  },
  methods: {
    async more () {
      if (this.isLoading || this.isEnd) { // 加载中和截止不触发
        return
      }
      let url = ''
      let tag = this.type === 'all' ? '' : `&tag=${this.type}`
      if (this.articleList) { // 说明已经不是第一次了
        let startId = this.articleList.slice(-1)[0]._id // 其实就是最后一个元素的_id
        url = `/article/list?operate=next&startId=${startId}`
      } else {
        url = '/article/list?operate=first'
      }
      url = url + tag
      this.isLoading = true
      let list = (await this.$http.get(url)).data
      this.$store.commit('addArticleList', {
        data: list, type: this.type
      })
      if (!list.length < 10) {
        this.$store.commit('setArticleListEnd', [this.type])
      }
      this.isLoading = false
    }
  },
  watch: {
    'type': async function (val, oldVal) {
      console.log(this.type)
      this.more()
    }
  },
  async mounted () {
    await this.more()// 获取了第一页再注册滚动时间，不然undefined报错
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
.article-list {
  max-width: 630px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 80px;
}

.big-divider {
  height: 50px;
}

.article-item {
  margin-top: 60px;
}
</style>
