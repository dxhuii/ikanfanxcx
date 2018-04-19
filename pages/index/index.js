//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    animeData: [],
    weekData: [],
    weekEng: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    weekDay: new Date().getDay() - 1,
    weekCn: ['一', '二', '三', '四', '五', '六', '日'],
    hasUserInfo: false,
    isAnimeData: false,
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
    console.info(w)
    this.setData({
      weekData: this.data.animeData[this.data.weekEng[w]],
      weekDay: w
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.navigateTo({
      url: `../search/index?id=${e.detail.value.input}`
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
    const week = this.data.weekDay
    const eng = this.data.weekEng
    wx.request({
      url: 'https://www.ikanfan.cn/tool/week.php',
      success: function (res) {
        console.log(res.data.ResponseData[eng[week]])
        console.log(eng[week])
        that.setData({
          animeData: res.data.ResponseData,
          weekData: res.data.ResponseData[eng[week]],
          isAnimeData: true,
        })
      }
    })
    wx.request({
      url: 'https://pic.sogou.com/pics/json.jsp?query=%E8%98%91%E8%8F%87%E5%A4%B4%20%E8%A1%A8%E6%83%85&st=5&start=0&xml_len=100&reqFrom=wap_result&',
      success: function (res) {
        console.log(res,'sogouxx');
        that.setData({
          smileList: res.data.items
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
