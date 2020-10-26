const app = getApp();
let signUpInfo = {};
Page({
    data: {
        message: {},
        type: '',
        id: '',
        ruleOptions: {
            '>': '大于',
            '>=': '大于等于',
            '=': '等于',
            '<': '小于',
            '<=': '小于等于'
        },
        discountMoney: 0
    },

    onLoad(params) {
        this.setData({
            'id': params.id,
            'type': params.type
        })
        this.getDetails()
    },

    checkboxChange(e) {
        let value = e.detail.value
        signUpInfo.rule = value
        let discountMoney = 0
        let rule = this.data.message.rule
        rule.forEach(item => {
            let id = item.id.toString()
            if (value.indexOf(id) != -1) {
                discountMoney += parseFloat(item.discount_money)
                if (item.rule_type == 'number') {
                    signUpInfo.personNumber = item.rule.value
                }
            }
        })
        this.setData({
            discountMoney
        })
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
            that.setData({
                message: data
            })
          }
        })
    },

    signUp() {
        wx.navigateTo({
            url: '/pages/signUp/index?id=' + this.data.id
        })
    },

    signUp2() {
        signUpInfo.train_id = this.data.id
        app.globalData.signUpInfo = signUpInfo
        wx.navigateTo({
            url: '/pages/signUp2/index'
        })
    }
})