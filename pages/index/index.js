//index.js
//获取应用实例
const app = getApp()
const week = new Date().getDay()
const a = new Array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    animeData: [],
    weekData: [],
    weekDay: week,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../anime/index'
    })
  },
  //事件处理函数
  bindWeek: function (event) {
    const w = event.currentTarget.dataset.week;
    this.setData({
      weekData: this.data.animeData[a[w - 1]],
      weekDay: w
    })
  },
  //跳入详情页
  vodInfo: function (event) {
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../anime/index?id=${id}`
    })
  },
  onLoad: function () {
    const that = this
    wx.request({
      url: 'https://www.ikanfan.cn/tool/week.php', //仅为示例，并非真实的接口地址
      success: function (res) {
        console.log(res.data.ResponseData[a[week - 1]])
        console.log(a[week - 1])
        that.setData({
          animeData: res.data.ResponseData,
          weekData: res.data.ResponseData[a[week - 1]]
        })
      }
    })
    if (app.globalData.userInfo) {
      console.info(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
