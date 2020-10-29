//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    list: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.init()
    } else if (this.data.canIUse){
      app.loginCallback = () => {
        this.init()
      }
    }

    this.getCourseList();
  },

  getPhoneNumber (e) {
    let that = this
    console.log(e)
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
    console.log(userInfo)
    this.setData({
      userInfo,
      hasUserInfo: true
    })
  },

  getCourseList() {
    let that = this
    app.request({
      url: '/indexlist',
      method: 'get',
      data: {},
      success: function(data) {
        that.setData({
          list: data
        })
      }
    })
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  signUp(e) {
    let type = e.currentTarget.dataset.type;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activityDetails/index?id='+ id + '&type=' + type
    })
  },


})
