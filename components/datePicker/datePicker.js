var app = getApp()

Component({
  properties: {
    value:  { // 值
      type: String,
      value: ''
    }
  },

  data: {
  },
  
  methods: {

    bindChange(e) {
      let index = e.detail.value
      this.setData({
        label: index
      })
      this.triggerEvent('change', {
        value: index
      })
    },

    clear() {
      this.setData({
        label: '',
        active: 0
      })
      this.triggerEvent('change', {
        value: '',
        index: 0
      })
    },
  }
})