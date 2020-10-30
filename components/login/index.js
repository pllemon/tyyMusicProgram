const app = getApp();
Component({
  data: {
    showAuth: false,
    authInfo: null,
    userInfo: null
  },
  methods: {
    showPopup() {
      this.setData({
        userInfo: app.globalData.userInfo,
        authInfo: app.globalData.authInfo,
        showAuth: true
      })
    },

    hidePopup() {
      this.setData({
        showAuth: false
      })
    },

    getUserInfo(e) {
      app.globalData.authInfo = e.detail.userInfo
      this.setData({
        authInfo: e.detail.userInfo,
        userInfo: app.globalData.userInfo,
      })
      if (app.globalData.userInfo.phone) {
        this.hidePopup()
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
              that.hidePopup()
            }
          })
        }
      })
    },
  }
})