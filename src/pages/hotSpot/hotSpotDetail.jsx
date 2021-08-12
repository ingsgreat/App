import React, {Component} from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import {View, Button, RichText, Image} from '@tarojs/components'
import {AtRate} from 'taro-ui'
import {APIBASEURL} from "../../constants/global";

class HotSpotDetail extends Component {
  constructor() {
    super(...arguments);
    const routerInfo = Taro.useRouter(true);
    const {isFavorite} = routerInfo.params;
    this.state = {
      flag: false | new Boolean(isFavorite),
      hotSpot: [],
      userCode: '',
      openid: ''
    }
  }

  /*收藏*/
  handleChange() {
    const {flag} = this.state;
    this.setState({
      flag: !flag
    })
  }

  componentDidMount() {
    Taro.getStorage({
      key: 'openid',
      success: (res) => {
        this.setState({
          openid: res.data.openid,
        })
      }
    });
    Taro.getStorage({
      key: '__itemcode__',
      success: result => {
        this.setState({
          userCode: result.data
        });
      }
    });
    const hotSpotCode = getCurrentInstance().router.params.id;
    Taro.request({
      url: `${APIBASEURL}/hotSpot/${hotSpotCode}`,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      dataType: 'json',
      credentials: 'include',
      success: (res) => {
        this.setState({
          hotSpot: res.data.data
        })
      },
      fail: function (errMsg) {
        Taro.showToast({
          title: '服务器请求错误',
          icon: 'none',
          duration: 3000
        })
      }
    });
  }

  clickCollection(userCode, hotspotCode, value) {
    if (value == 0) { // 收藏: 插入数据
      Taro.request({
        url: `${APIBASEURL}/hotSpotInsert`,
        data: {
          userCode,
          hotspotCode
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        dataType: 'json',
        credentials: 'include',
        success: (res) => {
          Taro.showToast({
            title: '收藏成功！',
            icon: 'none',
            duration: 1000
          })
        },
        fail: function (errMsg) {
          Taro.showToast({
            title: '服务器请求错误',
            icon: 'none',
            duration: 3000
          })
        }
      });
    } else { // 取消收藏: 删除数据
      Taro.request({
        url: `${APIBASEURL}/hotSpotDelete`,
        data: {
          userCode,
          hotspotCode
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'DELETE',
        dataType: 'json',
        credentials: 'include',
        success: (res) => {
          Taro.showToast({
            title: '取消收藏成功！',
            icon: 'none',
            duration: 1000
          })
        },
        fail: function (errMsg) {
          Taro.showToast({
            title: '服务器请求错误',
            icon: 'none',
            duration: 3000
          })
        }
      });
    }
  }

  hotSpotSave(userCode, hotspotCode, value) {
    if (this.state.openid) {
      this.handleChange();
      this.clickCollection(userCode, hotspotCode, value)
    } else {
      Taro.navigateTo({url: '/pages/myRecord/wxLogin'})
    }
  }

  render() {
    /*评分*/
    const {flag} = this.state;
    const value = flag ? '1' : '0';
    /*热点详情*/
    const {hotSpot} = this.state;
    /*用户itemCode*/
    let userCode = this.state.userCode;
    return (
      <View className=' hot-spot-detail'>
        <View className='hot-spot-detail-top'>
          <View className='hot-spot-detail-top-left'>
            <View className='hot-spot-detail-top-left-title'>
              {hotSpot.hotspotTitle}
            </View>
            <View className='hot-spot-detail-top-left-test'>
              {hotSpot.orgName}
            </View>
            <View className='hot-spot-detail-top-left-time-size'>
              {hotSpot.itemcreateatStringDetail}
            </View>
          </View>
          <View className='hot-spot-detail-top-right'>
            <AtRate
              max={1}
              size='25'
              value={value}
              onChange={this.hotSpotSave.bind(this, userCode, hotSpot.itemcode, value)}/>
          </View>
        </View>
        <View className='hot-spot-detail-article'>
          <RichText nodes={hotSpot.hotspotContent} user-select={true}/>
        </View>
        <tabBar/>
      </View>
    )
  }
}

HotSpotDetail.defaultProps={
  flag: false
};
export default HotSpotDetail
