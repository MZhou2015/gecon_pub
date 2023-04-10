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
    context.commit('cookies', mck)
  },
  async userverify (context, dx) {
    console.log('verify')
    const rootURL = context.getters.uroot
    console.log(rootURL)
    const furl = rootURL + '/user/verify'
    const restt = await axios.get(furl)
    console.log(restt.data)
  },
  randNum (context) {
    let r = Math.floor(Math.random() * 25)
    let s = Math.floor(Math.random() * 9)
    let char = String.fromCharCode(65 + r, 97 + s)
    let char2 = String.fromCharCode(107 + s)
    let b = char + r + char2 + s
    let refNo = {a: b, ref: 35000 + r * 13 + s * 106}
    context.commit('aRandom', refNo)
  },
  async xrate (context, sy) {
    const rootURL = context.getters.uroot
    const furl = rootURL + '/axios/xe'
    const restt = await axios.get(furl)
    console.log(restt.data)
    context.commit('upxrate', restt.data)
  }
}
