/**
 * Created by feng on 17-5-17.
 */
/**
 * {
 * "_id": "用户的mongodb id",
 * "name": "用户名",
 * "headImgUrl": "头像链接"},
 */
import http from 'axios'
export default {
  state: {
    userInfo: {},
    imageList: [],
    articleList: [],
    page: 1,
    isEnd: false
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    },
    addUserArticleList (state, payload) {
      state.page = state.page + 1
      state.articleList = state.articleList.concat(payload)
    },
    setUserArticleListEnd (state) {
      state.isEnd = true
    }
  },
  actions: {
    async getUserInfo ({commit}) {
      // 是否含有session
      try {
        let info = await http.get('/user/info')
        commit('setUserInfo', info.data)
      } catch (e) {}
      if (window.localStorage.rememberData) { // 本地localStorage存储密码
        try {
          let data = await http.post('/login', JSON.parse(window.localStorage.rememberData))
          commit('setUserInfo', data.data)
        } catch (e) {
          window.localStorage.removeItem('rememberData') // 可能设置了恶意值，给无情清除
        }
      }
    }
  }
}
