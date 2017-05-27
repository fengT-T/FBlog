<template>
  <div class="container">
    <div class="author columns">
      <div class="column col-1">
        <figure class="avatar avatar-lg">
          <img v-lazy="articleDate.author.headImgUrl+'?imageView2/1/w/200/h/200/interlace/1/q/75|imageslim'"
          />
        </figure>
      </div>
      <div class="column col-11">
        <div>
          {{articleDate.author.name}}
        </div>
        <div class="light small">{{articleDate.author.desc}}</div>
        <div class="light small">发表于：{{getTimeFromId(articleDate._id)}}</div>
      </div>
    </div>

    <h1 class="text-center">{{articleDate.title}}</h1>
    <p class="light">
      {{articleDate.summary}}
    </p>

    <div v-html="articleDate.content">
    </div>

    <div class="divider"></div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        articleDate: {
          _id:"0",
          title:"loading",
          author:{
            headImgUrl:false,
          }
        }
      }
    },
    methods:{
      getTimeFromId(id){
        return common.dateFormat(common.getDateFromMongodbId(id), "yyyy-MM-dd hh:mm:ss")
      },
    },
    async mounted(){
      try {
        this.articleDate = (await this.$http.get(`/article/info?articleId=${this.$route.params.articleId}`)).data
      } catch (e) {

      }
    }
  }
</script>
<style scoped="">
  .author .small {
    font-size: 13px;
  }

  .container {
    width: 70%;
    margin-top: 30px;
    max-width: 800px;
    margin-bottom: 100px;
  }
</style>
