const app = getApp();
Page({
  data: {
    trainList: []
  },

  onLoad() {
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

})