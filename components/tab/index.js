const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    active: {
      type: String,
      default: '0'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goStudy(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },

    goPerson() {
      wx.reLaunch({
        url: '/pages/person/index',
      })
    }
  }
})