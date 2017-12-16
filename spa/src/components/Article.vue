<template>
  <div class="article">
    <h1 class="title">
      {{article.title}}
    </h1>
    <p class="time">
      {{formatDate(article._id)}}
    </p>
    <p class="summary">
      {{article.summary}}
    </p>
    <div class="article-content" v-html="article.content"></div>
    <div class="loading loading-lg" v-show="isLoading"></div>

  </div>
</template>
<script>
import {get} from 'axios'
import common from '../common'
const {dateFormat, getDateFromMongodbId} = common

export default {
  data () {
    return {
      article: {
        title: 'Loading',
        summary: '',
        content: ''
      },
      isLoading: false
    }
  },
  methods: {
    formatDate (id) {
      return id && dateFormat(getDateFromMongodbId(id), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  async beforeMount () {
    this.isLoading = true
    let {data} = await get(`/article/${this.$route.params.id}`)
    this.isLoading = false
    this.article = data
  }
}
</script>
<style lang="stylus">
@media (max-width: 840px)
  .article
    margin 80px 0px 0px 0px!important
  p.summary
    text-align center
  div.article-content
    width 85%
    margin 0 auto
    overflow hidden

div.article
  max-width 700px
  margin 0 auto
  .title
    text-align center
  p.time
    text-align center
  p.summary
    color rgba(0,0,0,.44)
    font-size: .7rem
</style>

