const app = getApp();
Page({
    data: {
        form: {
            examination_id: '',
            songlist: [{
                song: '',
                song_number: '',
                song_authod: ''
            }]
        },
        scrollTop: 0,
        groupList: [],
        message: {}
    },

    onLoad(params) {
        this.setData({
            'form.examination_id': params.id
        })
        this.getDetails()
        this.getGroup()
    },

    getDetails() {
        let that = this
        app.request({
          url: '/examinationinfo?examination_id=' + that.data.form.examination_id,
          method: 'get',
          data: {},
          success: function(data) {
            that.setData({
                message: data
            })
          }
        })
    },

    getGroup() {
        let that = this
        app.request({
          url: '/examinationgroup?examination_id=' + that.data.form.examination_id,
          method: 'get',
          data: {},
          success: function(data) {
            console.log(data)
            that.setData({
                groupList: data
            })
          }
        })
    },

    addMusic() {
        let songlist = this.data.form.songlist
        if (songlist.length >= 5) {
            app.showToast('最多可以有5个曲目')
            return false
        }
        songlist.push({
            song: '',
            song_number: '',
            song_authod: ''
        })
        this.setData({
            'form.songlist': songlist
        })
        setTimeout(() => {
            this.setData({
                scrollTop: 100000
            })
        }, 500)
    },

    delMusic(e) {
        let songlist = this.data.form.songlist
        let idx = e.currentTarget.dataset.idx
        songlist.splice(idx, 1)
        this.setData({
            'form.songlist': songlist
        })
    },

    onChange(e) {
        let key = e.currentTarget.dataset.key
        let detail = e.detail
        this.setData({
            [key]: detail
        })
    },

    changePicker(e) {
        let key = e.currentTarget.dataset.key
        let detail = e.detail.value
        this.setData({
            [key]: detail
        })
    },

    signUp() {
        let that = this
        app.request({
            url: '/examinationsingup',
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