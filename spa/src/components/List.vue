<template>
  <div class="article-list">

    <h1 class="tag">{{tag}}</h1>

    <div class="article-item" :key="index" v-for="(article, index) in articleList ">
      <h3 class="title">
        <router-link class="underline" :to="`/article/${article._id}`">{{article.title}}</router-link>
      </h3>
      <div class="info">
        <span>
          发表于 {{formatDate(article._id)}} 
          &nbsp; 
        </span>
        <span class="label" :key="index" v-for="(tag, index) in article.tag">
          <router-link :to="`/list/${tag}`" >
            {{tag}}
          </router-link>
        </span>
      </div>
      <p class="summary">
        {{article.summary}}
      </p>
    </div>

    <button v-show="!isEnd" @click="getArticleList" class="btn btn-block" :class="{loading : isLoading}" >
      <p>Next</p>
    </button>

    <div v-if="isEnd" class="divider text-center" data-content="End"></div>
    
  </div>
</template>

<script>
import {get} from 'axios'
import common from '../common'
const {dateFormat, getDateFromMongodbId} = common
const limit = 5
const initStatus = {
  articleList: [],
  isEnd: false,
  isLoading: true
}

export default {
  name: 'list',
  data () {
    return {...initStatus}
  },
  computed: {
    tag () {
      return this.$route.params.tag || 'ALL'
    }
  },
  methods: {
    async getArticleList () {
      let last = this.articleList.slice(-1)[0]
      let tagSting = this.tag === 'ALL' ? '' : '&tag=' + this.tag
      let offsetString = last ? '&offset=' + last._id : ''
      this.isLoading = true
      let {data} = (await get(`/article?limit=${limit}${tagSting}${offsetString}`))
      this.isLoading = false
      this.articleList = this.articleList.concat(data)
      if (data.length < limit) this.isEnd = true
    },
    formatDate (id) {
      return dateFormat(getDateFromMongodbId(id), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  async beforeRouteUpdate (to, from, next) {
    common.init(initStatus, this)
    next()
    await this.getArticleList()
  },
  async beforeMount () {
    await this.getArticleList()
  }
}
</script>

<style lang="stylus">
@media (max-width: 840px)
  .article-list
    margin 0 auto
    text-align center
    max-width 350px!important
    .tag
      margin-top 60px

.article-list
  margin 0px auto 60px auto
  max-width 700px
  .tag
    font-weight lighter
    text-align center
    margin-bottom 50px
  .article-item
    margin 0px 0px 60px 0px
    >h3.title
      line-height 1.3
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    >div.info
      font-size 12px
      color #999
      margin 10px 20px 20px 0px
      overflow hidden
      height 18px
      >span.label
        margin-left 16px
    >p.summary
      font-size 14px
</style>
