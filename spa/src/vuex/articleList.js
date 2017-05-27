/**
 * Created by feng on 17-5-25.
 */
//数据结果如下
/**
 * {
 * "_id": "592518f9d8198012b60bdf37",
 * "title": "(2) Vue in 2016",
 * "summary": " 已经到2016年底了！在过去12个月中...",
 * "author": {
 *    "_id": "591d604a2f94414067e61471",
 *    "name": "fengying",
 *    "headImgUrl": "http://oahmwbdom.bkt.clouddn.com/feng201609031802477489.jpg"
 * },
 * "tag": [
 *  {
 *    "_id": "59231719fae96610bcffb78a",
 *    "name": "JavaScript"
 *  }
 * ]
 *}
 */
import Vue from "vue"

export default {
  state: {
    articleList: {},
    isEnd: {},
    isLoading: false
  },
  mutations: {
    /**
     * 你懂的，增加列表
     * @param state
     * @param payload
     */
    addArticleList(state, payload){
      if (!state.articleList[payload.type]) {
        Vue.set(state.articleList, payload.type, [])//提示一下vue该监视新的属性了 瞄～
      }
      state.articleList[payload.type] = state.articleList[payload.type].concat(payload.data)
    },
    /**
     * 设置结束标志
     * @param state
     */
    setEnd(state, payload){
      Vue.set(state.isEnd, payload, true)
    },
    setArticleListLoading(state){
      state.isLoading = !state.isLoading
    }
  }
}
