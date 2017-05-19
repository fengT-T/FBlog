<template>
  <div>
    <f-nav></f-nav>
    <article-list v-for="i in 10" key="i"></article-list>
  </div>

</template>
<script>
  import FNav from "./nav.vue"
  import ArticleList from "./article_list.vue"

  export default{
    components: {
      FNav,ArticleList
    }
  }
</script>
<style>

</style>
