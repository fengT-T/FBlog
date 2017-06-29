/**
 * Created by feng on 17-5-17.
 */
/**
 * {
 * "_id": "用户的mongodb id",
 * "name": "用户名",
 * "headImgUrl": "头像链接"},
 */
export default {
  state: {
    userInfo: window.sessionStorage.userInfo ? JSON.parse(window.sessionStorage.userInfo) : {},
    imageList:[],
    articleList: [],
    page: 1,
    isEnd: false
  },
  mutations: {
    /**
     * 这个userinfo是绑定到sessionStorage.userInfo上的，纯属闲的蛋疼啦
     * @param state
     * @param payload
     */
    setUserInfo (state, payload) {
      state.userInfo = payload
      window.sessionStorage.userInfo = JSON.stringify(state.userInfo)
    },
    addUserArticleList (state, payload) {
      // payload.map((e) => {
      //   e.author = state.userInfo// 加上用户信息
      // })
      state.page = state.page ++
      state.articleList = state.articleList.concat(payload)
    },
    setUserArticleListEnd (state) {
      state.isEnd = true
    }
  }
}
