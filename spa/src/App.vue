<template>
  <div id="app">
    <f-nav></f-nav>
    <router-view/>
  </div>
</template>

<script>
import FNav from './components/Nav'
export default {
  name: 'app',
  components: {
    FNav
  }
}
</script>

<style lang="stylus">
html body
  font-family "Source Code Pro", "Source Han Sans", "思源黑体", "Noto Sans CJK SC", "微软雅黑", "sans"

html a
  text-decoration none
  &:hover
    text-decoration none

html a.underline
  position relative
  text-decoration none
  &:hover
    text-decoration none
  &:before
    content ""
    position absolute
    width 100%
    height 2px
    bottom 0
    left 0
    background-color #5764c6
    visibility hidden
    -webkit-transform scaleX(0)
    -o-transform scaleX(0)
    transform scaleX(0)
    -webkit-transition all 0.3s ease-in-out 0s
    -o-transition all 0.3s ease-in-out 0s
    transition all 0.3s ease-in-out 0s
  &:hover:before
    visibility visible
    -webkit-transform scaleX(1)
    -o-transform scaleX(1)
    transform scaleX(1)

</style>
