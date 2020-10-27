const app = getApp();
Page({
    data: {
        form: {
            rule: [],
            train_id: '',
            signupInfo: []
        },
        scrollTop: 0,
        message: {}
    },

    onLoad() {
        let signUpInfo = app.globalData.signUpInfo
        let personNumber = signUpInfo.personNumber || 1
        let form = this.data.form
        form.rule = signUpInfo.rule || []
        form.train_id = signUpInfo.train_id
        for (let i = 0; i < personNumber; i++) {
            form.signupInfo.push({
                signup_name: '',
                phone: '',
                peopleid: ''
            })
        }
        this.setData({
            form
        })
        this.getDetails()
    },

    getDetails() {
        let that = this
        app.request({
          url: '/traininfo?train_id=' + that.data.form.train_id,
          method: 'get',
          data: {},
          success: function(data) {
            that.setData({
                message: data
            })
          }
        })
    },

    onChange(e) {
        let key = e.currentTarget.dataset.key
        let detail = e.detail
        this.setData({
            [key]: detail
        })
    },

    signUp() {
        let that = this
        console.log(that.data.form)
        app.request({
            url: '/trainsingup',
            data: that.data.form,
            success: function(data) {
                app.successToast('报名成功', function() {
                    wx.navigateBack({
                        delta: 1
                    })
                })
            }
        })
    }
})