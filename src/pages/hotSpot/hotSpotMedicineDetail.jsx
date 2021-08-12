//中药常识详情
import React, {Component} from "react";
import Taro,{getCurrentInstance} from "@tarojs/taro";
import {AtList, AtRate, AtSearchBar,AtListItem} from "taro-ui";
import {View,RichText,Image} from "@tarojs/components";
import {APIBASEURL} from "../../constants/global";
import {connect} from "react-redux";

@connect(({user})=>({
  user
}),(dispatch) => ({
}))
class HotSpotMedicineDetail extends Component{
  constructor() {
    super(...arguments);
    const routerInfo=Taro.useRouter(true);
    const {isFavorite}=routerInfo.params;
    this.state={
      flag:false | new Boolean(isFavorite),
      hotSpotMedicine: [],
      userCode: ''
    }
  }
  /*收藏*/
  handleChange(){
    const {flag}=this.state;
    this.setState({
      flag: !flag
    })
  }
  componentDidMount() {
    //在本地获取用户的itemCode
    Taro.getStorage({
      key:'__itemcode__',
      success:result => {
        this.setState({
          userCode:result.data
        });
        console.log('用户收藏__itemcode__:',result.data)
      }
    });
    const hotSpotMedicineCode=getCurrentInstance().router.params.id;
    Taro.request({
      url:`${APIBASEURL}/hotSpotMedicineDetail/${hotSpotMedicineCode}`,
      header:{
        'content-type':'application/json'
      },
      method:'GET',
      dataType:'json',
      credentials:'include',
      success:(res)=>{
        this.setState({
          hotSpotMedicine:res.data.data
        })
      },
      fail:function(errMsg){
        Taro.showToast({
          title:'服务器请求错误',
          icon:'none',
          duration:3000
        })
      }
    });
  }
  clickCollection(userCode,hotspotCode,value){
    //收藏：插入数据
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

  hotSpotSave(userCode,hotspotCode,value){
    this.handleChange();
    this.clickCollection(userCode,hotspotCode,value);
  }

  render(){
    /*评分*/
    const {flag}=this.state;
    const value=flag ? '1':'0';
    /*当前时间*/
    const {hotSpotMedicine}=this.state;
    /*用户itemCode*/
    let userCode=this.state.userCode;

    return(
      <View className='hot-spot-medicine-detail'>
        <View className='hot-spot-detail-medicine-image'>
          <Image
            className='at-article__img'
            src={hotSpotMedicine.filePath}
            mode='widthFix' />
        </View>
        <View className='at-row'>
          <View className='at-col at-col-2' />
          <View className='at-col at-col-8'>
            <View className='hot-spot-medicine-detail-title'>
              {hotSpotMedicine.name}
            </View>
            <View className='hot-spot-medicine-detail-ditem'>
              {hotSpotMedicine.ditemValue}
            </View>
          </View>

          <View className='hot-spot-detail-top-right'>
            <AtRate
              max={1}
              size='25'
              value={value}
              onChange={this.hotSpotSave.bind(this, userCode, hotSpotMedicine.itemcode, value)}/>
          </View>
        </View>

        <View className='hot-spot-medicine-detail-test'>
          <View className='hot-spot-medicine-detail-left'>【别&emsp;&emsp;名】</View>
          <View className='hot-spot-medicine-detail-right'>{hotSpotMedicine.alias}</View>
        </View>
        <View className='hot-spot-medicine-detail-test'>
          <View className='hot-spot-medicine-detail-left'>【采&emsp;&emsp;制】</View>
          <View className='hot-spot-medicine-detail-right'>{hotSpotMedicine.harvesting}</View>
        </View>
        <View className='hot-spot-medicine-detail-test'>
          <View className='hot-spot-medicine-detail-left'>【性&emsp;&emsp;味】</View>
          <View className='hot-spot-medicine-detail-right'>{hotSpotMedicine.taste}</View>
        </View>
        <View className='hot-spot-medicine-detail-test'>
          <View className='hot-spot-medicine-detail-left'>【归&emsp;&emsp;经】</View>
          <View className='hot-spot-medicine-detail-right'>{hotSpotMedicine.merTropism}</View>
        </View>
        <View className='hot-spot-medicine-detail-test'>
          <View className='hot-spot-medicine-detail-left'>【功效主治】</View>
          <View className='hot-spot-medicine-detail-right'>{hotSpotMedicine.governance}</View>
        </View>
        <View className='hot-spot-medicine-detail-test'>
          <View className='hot-spot-medicine-detail-left'>【用量用法】</View>
          <View className='at-col at-col--wrap hot-spot-medicine-detail-right'>{hotSpotMedicine.usage}</View>
        </View>
      </View>
    )
  }
}

export default HotSpotMedicineDetail
