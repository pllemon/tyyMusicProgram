var app = getApp()

Component({
  properties: {
    dict: { // 字典名
      type: String,
      value: ''
    },
    value:  { // 值
      type: String,
      value: ''
    },
    arr: { // 选择范围
      type: Array,
      value: []
    },
    key: {
      type: String,
      value: 'label'
    },
    key2: {
      type: String,
      value: 'id'
    },
    isNumber: {
      type: Boolean,
      value: false
    }
  },

  data: {
    active: 0,
    rangeKey: '',
    valueKey: '',
    label: '',
    range: []
  },
  
  observers: {
    value(val) {
      this.setValue()
    },
    arr(val) {
      this.setData({
        range: val
      })
      this.setValue()
    },
  },

  ready() {
    let systemDict = app.globalData.systemDict
    if (this.properties.dict) {
      this.setData({
        rangeKey: 'label',
        valueKey: 'id',
        range: systemDict[this.properties.dict]
      })
    } else {
      this.setData({
        rangeKey: this.properties.key,
        valueKey: this.properties.key2,
        range: this.properties.arr
      })
    }
    this.setValue()
  },
  methods: {
    setValue() {
      let value = this.properties.value
      if (value) {
        let index = this.data.range.findIndex(item => {
          return item[this.data.valueKey] == this.properties.value
        })
        if (index != -1) {
          this.setData({
            label: this.data.range[index][this.data.rangeKey],
            active: index
          })
        } else {
          this.setData({
            label: '',
            active: 0
          })
        }
      } else {
        this.setData({
          label: '',
          active: 0
        })
      }
    },

    bindChange(e) {
      let index = e.detail.value
      let value = this.data.range[index][this.data.valueKey]
      this.setData({
        label: this.data.range[index][this.data.rangeKey]
      })
      this.triggerEvent('change', {
        value: this.properties.isNumber ? Number(value) : value,
        index: index
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