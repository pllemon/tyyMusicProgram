//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
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
    } else{
      app.loginCallback = () => {
        this.init()
      }
    }

    this.getCourseList();
  },

  init() {
    let userInfo = app.globalData.userInfo
    this.setData({
      userInfo
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

  signUp(e) {
    let userInfo = app.globalData.userInfo;
    if (!userInfo.phone) {
      this.selectComponent("#login").showPopup();
      return false;
    }
    let type = e.currentTarget.dataset.type;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/activityDetails/index?id='+ id + '&type=' + type
    })
  }
})
