/**
 * Created by feng on 17-5-26.
 */
module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    // 捕获由于用户输入错误等触发的操作，几乎所有的错误都会在这里被捕获
    if (e && e.message === 'Suprise!MotherFucker!') {
      ctx.status = e.status
      console.log(e)// 我就想看看有多少错误“攻击”之类的出现
      ctx.body = e.responseData || e.message
    } else {
      // 如果没有 let it crash
      console.error(e)
      throw e
    }
  }
}
