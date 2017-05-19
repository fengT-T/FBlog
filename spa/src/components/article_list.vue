<template>
  <div class="article-list">
    <h4><a href="">Libvirt结构及部分源代码分析</a></h4>
    <div class="time">
      作者：<a href="">
        feng
      </a>&nbsp; - &nbsp;发表于 2015-04-13
      &nbsp;&nbsp;
      <span class="label">JavaScript</span>
      <span class="label">Vue</span>
    </div>
    <p>这篇文章前序部分来自于Libvirt的官方主页的翻译，
      最近做Libvirt集成方面的工作，奈何源码中的函数太多、
      各种结构体，确实比较乱，查过来查过去还是官方给的清楚一些，这里就翻译过来，
      来加强下自己的理解。首先说下这篇文章不是介绍libvirt的架构的，
      这网上有很多，而是结合libvirt1.2.2这篇文章前序部分来自于Libvirt的官方主页的翻译，
      最近做Libvirt集成方面的工作，奈何源码中的函数太多、
      各种结构体，确实比较乱，查过来查过去还是官方给的清楚一些，这里就翻译过来，
      来加强下自己的理解。首先说下这篇文章不是介绍libvirt的架构的，
      这网上有很多，而是结合libvirt1.2.2 </p>
  </div>
</template>
<script>

  export default{}
</script>
<style scoped="">
  a{
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
  .article-list {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 80px;
    width: 60%;
  }

  .article-list .time {
    color: #999;
    font-family: 'Lato', "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 12px;
    margin-bottom: 10px;
  }
  p{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
