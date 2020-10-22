const app = getApp();
Page({
    data: {
        message: {
            id: 1,
            name: '2020秋季全国钢琴大赛',
            startTime: '2020.10.01',
            endTime: '2020.10.08',
            type: 1
        },
        type: '',
        id: ''
    },

    onLoad(params) {
        this.setData({
            'id': params.id,
            'type': params.type
        })
        this.getDetails()
    },

    getDetails() {
        let that = this
        let url = '/examinationinfo?examination_id=' + that.data.id
        if (that.data.type == 2) {
            url = '/traininfo?train_id=' + that.data.id
        }
        app.request({
          url,
          method: 'get',
          data: {},
          success: function(data) {
            console.log(data)
          }
        })
    },

    signUp() {
        wx.navigateTo({
            url: '/pages/signUp/index?id=' + this.data.id
        })
    },

    signUp2(e) {
        let type = e.currentTarget.details.type
        wx.navigateTo({
            url: '/pages/signUp2/index?type=' + type
        })
    }
})