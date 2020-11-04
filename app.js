//app.js
let systemDict = {
  'SEX': [{label: '男', id: 1}, {label: '女', id: 2}]
}

App({
  onLaunch: function () {
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    Promise.all([this.wxAuth(), this.userLogin()]).then(result => {
      if (that.loginCallback) {
        that.loginCallback()
      }
    })
  },

  request: function (obj) {
    let that = this
    if (!obj.hideLoading) {
      wx.showLoading({
        title: obj.loadText || '加载中',
        mask: true
      })
    }
    wx.request({
      url: 'https://music.eqask.com' + obj.url,
      method: obj.method || 'POST',
      header: {
        'content-type': 'application/json',
        'cookie': that.globalData.session
      },
      data: obj.data || {},
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.success) {
            if (obj.success) {
              obj.success(res.data.data)
            }
          } else {
            if (res.data.code == 404) {
              wx.showModal({
                content: '登录失效，请重新登录',
                showCancel: false,
                success (res) {
                  if (res.confirm) {
                    wx.removeStorageSync('session');
                    wx.reLaunch({
                      url: '/pages/index/index'
                    })
                  }
                }
              })  
            } else {
              wx.showModal({
                content: res.data.message,
                showCancel: false
              })  
            }        
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '请求出错',
            showCancel: false
          })  
        }
      },
      complete() {
        if (!obj.hideLoading) {
          wx.hideLoading()
        }
        if (obj.complete) {
          obj.complete()
        }
      }
    })
  },

  // 微信授权
  wxAuth() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                this.globalData.authInfo = res.userInfo
                resolve()
              },
              fail: () => {
                resolve()
              }
            })
          } else {
            resolve()
          }
        },
        fail: () => {
          resolve()
        }
      })
    })
  },

  // 获取用户信息
  userLogin() {
    return new Promise((resolve, reject) => {
      let that = this
      wx.login({
        success: res => {
          that.request({
            url: '/userlogin',
            method: 'get',
            hideLoading: true,
            data: {
              code: res.code
            },
            success: function(data) {
              that.globalData.sessionKey = data.session_key
              that.globalData.session = data.session_id
              that.request({
                url: '/getuserinfo',
                method: 'get',
                data: {},
                hideLoading: true,
                success: function(data) {
                  that.globalData.userInfo = data
                  resolve()
                }
              })
            }
          })
        }
      })
    })
  },

  showToast(title, icon = 'none') {
    wx.showToast({
      icon: icon,
      title: title
    })
  },

  successToast(text, callback) {
    wx.showToast({
      title: text,
      icon: 'success',
      duration: 1000,
      mask: true
    })
    if (callback) {
      setTimeout(function () {
        callback()
      }, 1000)
    }
  },
  
  showModal(text, callback) {
    wx.showModal({
      showCancel: false,
      content: text,
      success (res) {
        if (res.confirm && callback) {
          callback()
        }
      }
    })
  },

  
  globalData: {
    userInfo: {},
    authInfo: null,
    sessionKey: null,
    session: '',
    signUpInfo: null,
    systemDict
  }
})