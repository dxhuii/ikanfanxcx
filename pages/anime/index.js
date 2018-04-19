// pages/anime/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    anime: [],
    playList: [],
    playerList: [],
    playerData: [],
    isJump: 0,
    close: false,
    isData: false
  },
  playName(a) {
    var b = []
    b['tudou'] = '土豆'
    b['youku'] = '优酷'
    b['iqiyi'] = '爱奇艺'
    b['letv'] = '乐视'
    b['sohu'] = '搜狐'
    b['pptv'] = '聚力'
    b['qq'] = '腾讯'
    b['letvyun'] = '乐视云'
    b['bilibili'] = '哔哩哔哩'
    b['acfun'] = 'A站'
    b['other'] = '其他'
    b['pv'] = 'PV'
    b['bgm'] = 'BGM'
    b['ed'] = 'ED'
    b['cm'] = 'CM'
    b['op'] = 'OP'
    b['mad'] = 'MAD'
    b['other'] = '其他A'
    b['otherB'] = '其他B'
    b['otherC'] = '其他C'
    b['otherD'] = '其他D'
    b['nodel'] = '未删减'
    return b[a]
  },
  playUrl(type, url) {
    console.log(url)
    return `https://m.ikanfan.com${url}?source=${type}&from=xcx`
  },
  playerList(event) {
    const dataset = event.currentTarget.dataset;
    const { vid, url } = dataset
    const d1 = url.split('/')[3].split('-')
    const d2 = d1[1].split('.')
    const sid = d1[0]
    const pid = d2[0]
    console.info(this)
    const data = this.data.playList
    let playerData = []
    for (let e = 0; e < data.length; e++) {
      const d = data[e].playurls[parseInt(pid) - 1]
      pid <= data[e].playurls.length && playerData.push({ type: data[e].playname, vid: d[1], name: this.playName(data[e].playname), title: d[0], url: d[2] })
    }
    console.info(playerData, sid, pid, data)
    this.setData({
      playerData,
      close: true
    })
  },
  player(event) {
    const dataset = event.currentTarget.dataset;
    const { type, url } = dataset
    const href = this.playUrl(type, url)
    if (this.data.isJump){
      wx.navigateTo({
        url: `../detail/index?url=https://m.ikanfan.com${url}&source=${type}&from=xcx`
      })
    }else{
      wx.setClipboardData({
        data: href,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showModal({
                title: '复制成功',
                content: `把《${href}》粘贴到浏览器就可以播放了`,
                showCancel: false
              })
            }
          })
        }
      })
    }
  },
  close() {
    this.setData({
      close: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(this, options)
    const that = this
    wx.request({
      url: `https://www.ikanfan.cn/tool/xcxDetail.php?id=${options.id}`, // 详情
      success: function (res) {
        console.log(res.data.data[0])
        that.setData({
          anime: res.data.data[0],
          isData: true
        })
        wx.setNavigationBarTitle({ title: res.data.data[0].name })
      }
    })
    wx.request({
      url: `https://www.ikanfan.cn/tool/xcxplaylist.php?id=${options.id}`, // 播放列表
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data){
          const data = res.data.data.Data
          that.setData({
            playList: data,
            playerList: data[0].playurls
          })
        }else{
          that.setData({
            playerList: false
          })
        }
      }
    })
    wx.request({
      url: 'https://www.ikanfan.cn/tool/xcxIsJump.php',
      success: function (res) {
        console.log(res.data)
        that.setData({
          isJump: res.data.status
        })
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