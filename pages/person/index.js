const app = getApp();
Page({
  data: {
    trainList: [],
    userInfo: null,
    authInfo: null
  },

  onLoad() {
    if (app.globalData.userInfo) {
      this.init()
    } else {
      app.loginCallback = () => {
        this.init()
      }
    }
    
    if (app.globalData.authInfo) {
      this.setData({
        authInfo: app.globalData.authInfo
      })
    } else{
      app.userInfoReadyCallback = res => {
        this.setData({
          authInfo: res.userInfo
        })
      }
    }
  },

  getPhoneNumber (e) {
    let that = this
    wx.login({
      success: res => {
        app.request({
          url: '/getuserphone',
          method: 'get',
          data: {
            session_key: app.globalData.sessionKey,
            code: res.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
          },
          success: function(data) {
            app.globalData.userInfo.phone = data.phone
            that.setData({
              'userInfo.phone': data.phone
            })
          }
        })
      }
    })
  },

  init() {
    let userInfo = app.globalData.userInfo
    this.setData({
      userInfo,
      hasUserInfo: true
    })
    this.getTrainList()
  },

  getTrainList() {
    let that = this
    app.request({
      url: '/mytrainsingup',
      method: 'get',
      data: {},
      success: function(data) {
        that.setData({
          trainList: data
        })
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.authInfo = e.detail.userInfo
    this.setData({
      authInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})