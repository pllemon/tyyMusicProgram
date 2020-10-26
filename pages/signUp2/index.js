const app = getApp();
Page({
    data: {
        form: {
            rule: [],
            train_id: '',
            signupInfo: []
        },
        scrollTop: 0
    },

    onLoad() {
        let signUpInfo = app.globalData.signUpInfo
        let personNumber = signUpInfo.personNumber || 1
        let form = this.data.form
        form.rule = signUpInfo.rule
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
    },

    onChange(e) {
        let key = e.currentTarget.dataset.key
        let detail = e.detail
        this.setData({
            [key]: detail
        })
    },

    signUp() {
        console.log(this.data.form)
    }
})