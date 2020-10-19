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
    },

    onLoad(params) {
        this.setData({
            'message.type': params.type
        })
    },

    signUp() {
        wx.navigateTo({
            url: '/pages/signUp/index'
        })
    },

    signUp2(e) {
        let type = e.currentTarget.details.type
        wx.navigateTo({
            url: '/pages/signUp2/index?type=' + type
        })
    }
})