/**
 * Created by feng on 17-5-17.
 */
export default {
  state: {
    toastList: []
  },
  mutations: {
    /**
     * 增加这个toast
     * @param state
     * @param payload 数据对象
     */
    incrementToast (state, payload) {
      state.toastList.push(payload)
    },
    /**
     * 删除toast
     * @param state
     * @param payload 数据的index
     */
    deleteToast (state, payload) {
      state.toastList.splice(payload, 1)
    },
    /**
     * 机智的移除第一个toast
     * @param state
     * @constructor
     */
    ShiftToast (state, payload) {
      if (state.toastList[0] === payload) { state.toastList.shift() }
    }
  },
  actions: {
    incrementToastAndShift ({commit}, payload) {
      commit('incrementToast', payload)
      // 五秒钟删除
      setTimeout(function () {
        commit('ShiftToast', payload)
      }, 5000)
    }
  }
}
