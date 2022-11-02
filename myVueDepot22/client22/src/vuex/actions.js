import axios from 'axios'

export default {
  setCookie (context, dt) {
    const d = new Date()
    d.setTime(d.getTime() + (5 * 24 * 60 * 60 * 1000)) // set cookie Expire Day
    console.log(dt, d.toGMTString())
    let expires = 'expires=' + d.toUTCString()
    document.cookie = 'lastSession=' + dt + ';' + expires + ';path=/'
  },
  getCookie (context, dt) {
    let xc = document.cookie // sread cookie Expire Day
    console.log(xc)
    let mck = {}
    xc.split(';').forEach(item => {
      if (!item) {
        return
      }
      let arr = item.split('=')
      let key = arr[0].trim()
      let val = arr[1]
      mck[key] = val
    })
    console.log(mck)
    context.commit('cookies', mck)
  },
  async userverify (context, dx) {
    console.log('verify')
    const rootURL = context.getters.uroot
    console.log(rootURL)
    const furl = rootURL + '/user/verify'
    const restt = await axios.get(furl)
    console.log(restt.data)
  }
}
