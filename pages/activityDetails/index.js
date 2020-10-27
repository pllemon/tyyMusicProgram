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
        discountMoney: 0,
        finish: false
    },

    onLoad(params) {
        this.setData({
            'id': params.id,
            'type': params.type
        })
        this.getDetails()

        let title = ''
        if (params.type == 1) {
            title = '比赛详情'
        } else {
            title = '培训详情'
        }
        wx.setNavigationBarTitle({
            title
        })
    },

    onShareAppMessage: function (res) {
        return {
            title: this.data.message.info.title,
            path: '/pages/activityDetails/index?id=' + this.data.message.info.id
        }
    },

    chooseItem(e) {
        let dataset = e.currentTarget.dataset
        let rule = this.data.message.rule
        let discountMoney = 0
        let chooseRule = []
        rule[dataset.index].check = !rule[dataset.index].check
        rule.forEach(item => {
            if (item.check) {
                chooseRule.push(item.id)
                discountMoney += parseFloat(item.discount_money)
                if (item.rule_type == 'number') {
                    signUpInfo.personNumber = item.rule.value
                }
            }
        })
        console.log(rule)
        signUpInfo.rule = chooseRule
        this.setData({
            'message.rule': rule,
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
            if (data.rule) {
                data.rule.forEach(item => {
                    item.check = false
                })
            }
            let message = data
            if (that.data.type == 1) {
                message = {
                    info: data
                }
            }
            that.setData({
                message,
                finish: true
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
            url: '/pages/signUp2/index?id=' + this.data.id
        })
    }
})