/**
 * Created by feng on 17-5-17.
 */
/**
 * {
		"_id": "用户的mongodb id",
		"name": "用户名",
		"headImgUrl": "头像链接"},
 */
export default {
  state: {
    userInfo: sessionStorage.userInfo ? JSON.parse(sessionStorage.userInfo) : {},
  },
  mutations: {
    /**
     * 这个userinfo是绑定到sessionStorage.userInfo上的，纯属闲的蛋疼啦
     * @param state
     * @param payload
     */
    setUserInfo(state, payload){
      state.userInfo = payload
      sessionStorage.userInfo = JSON.stringify(state.userInfo)
    }
  }
}
