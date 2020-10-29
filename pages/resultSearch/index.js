const app = getApp();
Page({
    data: {
        achievement: [],
        signuplist:  [],
        finish: false,
        form: {
            name: '',
            peopleid: ''
        }
    },

    onChange(e) {
        let key = e.currentTarget.dataset.key
        let detail = e.detail
        this.setData({
            [key]: detail
        })
    },

    getList() {
        let that = this
        if (that.data.form.name === '') {
            app.showModal('请输入姓名')
            return false;
        }
        if (that.data.form.peopleid === '') {
            app.showModal('请输入身份证')
            return false;
        }
        app.request({
          url: '/examinationachievement',
          method: 'get',
          data: {
            peopleid: this.data.peopleid
          },
          success: function(data) {
            that.setData({
                achievement: data.achievement,
                signuplist: data.signuplist,
                finish: true
            })
          }
        })
    },
})