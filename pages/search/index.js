// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: []
  },
  //跳入详情页
  vodInfo: function (event) {
    const id = event.currentTarget.dataset.id;
    const jumpId = id.indexOf('/') !== -1 ? id.split('/')[2] : id
    wx.navigateTo({
      url: `../anime/index?id=${jumpId}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(this, options)
    const that = this
    wx.request({
      url: `https://www.ikanfan.cn/tool/so.php?q=${options.id}`, // 详情
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          data: res.data.data,
        })
        wx.setNavigationBarTitle({ title: `搜索的是：${options.id}` })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})