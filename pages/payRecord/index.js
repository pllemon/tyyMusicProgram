const app = getApp();
Page({
    data: {
        list: [],
        finish: false
    },

    onLoad() {
        this.getLog()
    },

    getLog() {
        let that = this
        app.request({
            url: '/paylog',
            method: 'get',
            data: {},
            success: function(data) {
                that.setData({
                    list: data,
                    finish: true
                })
            }
        })
    }
})