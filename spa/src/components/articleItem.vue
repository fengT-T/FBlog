<template>
  <div class="article-item">
    <h3>
      <router-link :to="`/article/${article._id}`">{{article.title}}</router-link>
      <slot name="edit"></slot>
      <slot name="delete"></slot>
    </h3>
    <div class="time">
      <span v-show="show_name">作者：
        <router-link :to="`/userPage/${article.author._id}`"> {{article.author.name}} </router-link> &nbsp; - &nbsp; </span> 发表于 {{getTimeFromId(article._id)}} &nbsp;&nbsp;
      <span class="label" v-for="(tag,index) in article.tag" :key="index">{{tag}}</span>
    </div>
    <p> {{article.summary}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    show_name () {
      return !!this.article.author.name
    }
  },
  props: ['article'],
  methods: {
    getTimeFromId (id) {
      let { common } = window
      return common.dateFormat(common.getDateFromMongodbId(id), 'yyyy-MM-dd')
    }
  }
}
</script>
<style scoped="">
a {
  position: relative;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #5764c6;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  -o-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  -o-transform: scaleX(1);
  transform: scaleX(1);
}

.time {
  color: #999;
  font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 12px;
  margin-bottom: 10px;
}

p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}



/*.divider[data-content]::after, .divider-vert[data-content]::after {*/


/*color: #5764c6;*/


/*}*/


/*.divider {*/


/*border-top: .1rem solid #5764c6;*/


/*}*/
</style>