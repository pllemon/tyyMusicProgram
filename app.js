//app.js
App({
  onLaunch: function () {
    let that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        that.request({
          url: '/userlogin',
          method: 'get',
          data: {
            code: res.code
          },
          success: function(data) {
            that.globalData.loginInfo = data
            that.globalData.session = data
            if (that.loginCallback) {
              that.loginCallback()
            }
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
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
      url: 'http://120.25.25.90:8081' + obj.url,
      method: obj.method || 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
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
                      url: '/pages/login/login?type=1'
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

  showToast(title, icon = 'none') {
    wx.showToast({
      icon: icon,
      title: title
    })
  },
  
  globalData: {
    userInfo: null,
    loginInfo: null,
    session: '',
    signUpInfo: null
  }
})