<template>
  <header class="navbar">
    <section class="navbar-section topbar">
      
      <router-link to="/" class="navbar-brand mr-2">
        <img src="../assets/logo.png" class="log" alt="">
      </router-link>
      <button class="btn show-md" @click="showMobieMenu = !showMobieMenu">
        <i class="icon icon-menu"/>
      </button>

    </section>

    <section class="navbar-section hide-md tag-list">
      <router-link class="underline" :key="index" :to="tag.url" v-for="(tag, index) in tagList">
        {{ tag.name }}
      </router-link>
    </section>

      <!-- 手机菜单的弹出层 -->
      <transition name="slide">
        <ul class="menu mobie-menu" v-if="showMobieMenu">
          <li class="divider" data-content="Tags">
          </li>
          <li class="menu-item" :key="index" v-for="(tag, index) in tagList"> 
            <router-link :to="tag.url" @click.native="showMobieMenu = false">
              {{tag.name}}
            </router-link>
          </li>
        </ul>
      </transition>

      <a class="close-menu" href="javascript:void(0);" v-if="showMobieMenu" @click="showMobieMenu = false"></a>

  </header>
</template>

<script>
import {get} from 'axios'

export default{
  data () {
    return {
      tagList: [
        {
          name: 'JavaScript',
          url: '/list/JavaScript'
        }
      ],
      showMobieMenu: false
    }
  },
  async beforeMount () {
    this.tagList = (await get('/tag')).data.tag
  }
}
</script>

<style lang="stylus">
@media (max-width: 840px)
  header
    >section.topbar
      z-index 100
      position fixed
      top 0px
      padding 10px 30px
      margin 0px
      width 100%
      background: rgba(248, 249, 250, .65);
    >section
      justify-content space-between

.mobie-menu
  position fixed
  top 0px
  left 0px
  height 100%
  z-index 100

.slide-enter-active
  transition all .3s ease
.slide-leave-active
  transition all .3s
.slide-enter, .slide-leave-to
  transform translateX(-50px)
  opacity 0

a.close-menu
  display block
  z-index 50
  background rgba(69, 77, 93, .1)
  border-color transparent
  border-radius 0
  bottom 0
  height 100%
  width 100%
  left 0
  position: fixed
  right 0
  top 0

header
  max-width 1400px
  margin 0 auto
  >section
    padding 20px 100px
  >section.tag-list
    >a
      margin-left 20px
  img.log
    width 40px
    height 40px
</style>