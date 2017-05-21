/**
 * Created by feng on 17-5-14.
 */
const assert = require('assert')
const supertest = require('supertest')
let app = require('../app')
function request () {
  return supertest(app.listen(4321))
}
describe('register-test', function () {
  it('输入错误 422', (done) => {
    request()
            .post('/login')
            .expect((res) => {
              res.body.password = '123'// 明显比较短的密码 6-16
              res.body.name = '123'// 明显比较短的用户名 4-20
              res.body.code = '1234wer'
            })
            .expect(422, done)
  })
    // 正确组
  it('输入正确 200', (done) => {
    request()
            .post('/login')
            .send({
              name: 'feng',
              password: '123456'
            })
            .expect(200, done)
  })
})
