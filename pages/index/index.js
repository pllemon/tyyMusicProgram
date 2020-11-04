//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    list: [],
    finish: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo.user_id) {
      this.init(false)
    } else{
      app.loginCallback = () => {
        this.init(true)
      }
    }
  },

  init(hideLoading) {
    let userInfo = app.globalData.userInfo
    this.setData({
      userInfo,
      finish: true
    })
    this.getCourseList(hideLoading);
  },

  getCourseList(hideLoading) {
    let that = this
    app.request({
      url: '/indexlist',
      method: 'get',
      data: {},
      hideLoading,
      success: function(data) {
        that.setData({
          list: data
        })
      },
      complete: function() {
        wx.hideLoading()
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
