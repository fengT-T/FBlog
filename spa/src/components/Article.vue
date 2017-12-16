<template>
  <div class="article">
    <h1 class="title">
      {{article.title}}
    </h1>
    <p class="time">
      2014.5.5
    </p>
    <p class="summary">
      {{article.summary}}
    </p>
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>
<script>
import {get} from 'axios'
export default {
  data () {
    return {
      article: {
        title: 'Loading',
        summary: '',
        content: ''
      }
    }
  },
  async beforeMount () {
    let {data} = await get(`/article/${this.$route.params.id}`)
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

