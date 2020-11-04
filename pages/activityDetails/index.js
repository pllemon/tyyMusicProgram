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
        finish: false,
        personNumber: 1,
        desc: ''
    },

    onLoad(params) {
        this.setData({
            'id': params.id,
            'type': params.type
        })
        if (app.globalData.userInfo.user_id) {
            this.getDetails(false)
        } else{
            app.loginCallback = () => {
                this.getDetails(true)
            }
        }

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
        app.request({
            url: '/addsharelog',
            method: 'post',
            data: {
                desc: this.data.message.info.title,
                nickname: app.globalData.authInfo ? app.globalData.authInfo.nickName : ''
            }
        })
        return {
            title: this.data.message.info.title,
            path: '/pages/activityDetails/index?id=' + this.data.id + '&type=' + this.data.type
        }
    },

    chooseItem(e) {
        let dataset = e.currentTarget.dataset
        let rule = this.data.message.rule
        let discountMoney = 0
        let chooseRule = []
        let personNumber = 1
        rule[dataset.index].check = !rule[dataset.index].check
        rule.forEach(item => {
            if (item.check) {
                chooseRule.push(item.id)
                discountMoney += parseFloat(item.discount_money)
                if (item.rule_type == 'number') {
                    personNumber = item.rule.value
                }
            }
        })
        signUpInfo.rule = chooseRule
        signUpInfo.personNumber = personNumber
        signUpInfo.sumMoney = (this.data.message.info.money - discountMoney) * personNumber
        this.setData({
            'message.rule': rule,
            discountMoney,
            personNumber
        })
    },

    getDetails(hideLoading) {
        let that = this
        let userInfo = app.globalData.userInfo
        that.setData({
            userInfo
        })
        let url = '/examinationinfo?examination_id=' + that.data.id
        if (that.data.type == 2) {
            url = '/traininfo?train_id=' + that.data.id
        }
        let desc = ''
        app.request({
          url,
          method: 'get',
          data: {},
          hideLoading,
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
            if (message.info.desc) {
                let descStr = (message.info.desc.replace(/<(.+?)>/gi,"&lt;$1&gt;")).replace(/ /gi,"&nbsp;")
                let descArr = []
                descStr.split('\n').forEach(item=>descArr.push(`<p style="line-height:1.8">${item}</p>`));
                desc = descArr.join('')
            }
            that.setData({
                desc,
                message,
                finish: true
            })
          },
          complete: function() {
            wx.hideLoading()
          }
        })
    },

    signUp() {
        let userInfo = app.globalData.userInfo;
        if (!userInfo.phone) {
          this.selectComponent("#login").showPopup();
          return false;
        }
        wx.navigateTo({
            url: '/pages/signUp/index?id=' + this.data.id
        })
    },

    signUp2() {
        let userInfo = app.globalData.userInfo;
        if (!userInfo.phone) {
          this.selectComponent("#login").showPopup();
          return false;
        }
        signUpInfo.train_id = this.data.id
        if (!signUpInfo.sumMoney) {
            signUpInfo.sumMoney = this.data.message.info.money
        }
        app.globalData.signUpInfo = signUpInfo
        wx.navigateTo({
            url: '/pages/signUp2/index?id=' + this.data.id
        })
    },

    showPopup() {
        this.selectComponent("#login").showPopup();
    }
})