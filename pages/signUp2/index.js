const app = getApp();
Page({
    data: {
        form: {
            music: [{
                name: '',
                person: '',
                region: ''
            }]
        },
        scrollTop: 0
    },

    addMusic() {
        let music = this.data.form.music
        if (music.length >= 5) {
            app.showToast('最多可以有5个曲目')
            return false
        }
        music.push({
            name: '',
            person: '',
            region: ''
        })
        this.setData({
            'form.music': music
        })
        setTimeout(() => {
            this.setData({
                scrollTop: 100000
            })
        }, 500)
    },

    delMusic(e) {
        let music = this.data.form.music
        let idx = e.currentTarget.dataset.idx
        music.splice(idx, 1)
        this.setData({
            'form.music': music
        })
    },

    onChange(e) {
        let key = e.currentTarget.dataset.key
        let detail = e.detail
        this.setData({
            [key]: detail
        })
    }
})