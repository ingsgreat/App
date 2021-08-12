import React, { Component} from 'react'
import { View, Image } from '@tarojs/components'
import {BASEURL} from "../../constants/global";
import './hotSpotIcon.less'

class HotSpotIcon extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }

  //改变热点数据类型
  changeData(dataType){
    this.props.parent.beforeReloadList(dataType,1);
  }

  //中药常识跳转
  changeDataMedicine(dataType){
    this.props.parent.beforeReloadMedicineList(dataType,1);
  }

  render() {
    return(
      <View className='at-row at-row--wrap hot-spot-icon'>
        <View className='at-col at-col-4 hot-spot-icon-list' onClick={this.changeData.bind(this, '0')}>
          <Image className='hot-spot-icon-list-image' src={`${BASEURL}jqys.svg`} />
          <View className='at-article__p'>节气养生</View>
        </View>
        <View className='at-col at-col-4 hot-spot-icon-list' onClick={this.changeData.bind(this, '1')}>
          <Image className='hot-spot-icon-list-image' src={`${BASEURL}zwbj.svg`} />
          <View className='at-article__p'>自我保健</View>
        </View>
        <View className='at-col at-col-4 hot-spot-icon-list' onClick={this.changeData.bind(this, '2')}>
          <Image className='hot-spot-icon-list-image' src={`${BASEURL}yssl.svg`} />
          <View className='at-article__p'>药膳食疗</View>
        </View>
        <View className='at-col at-col-4 hot-spot-icon-list' onClick={this.changeData.bind(this, '7')}>
          <Image className='hot-spot-icon-list-image' src={`${BASEURL}zycs.svg`} />
          <View className='at-article__p'>中药常识</View>
        </View>
        <View className='at-col at-col-4 hot-spot-icon-list' onClick={this.changeData.bind(this, '3')}>
          <Image className='hot-spot-icon-list-image' src={`${BASEURL}zzwh.svg`} />
          <View className='at-article__p'>中医文化</View>
        </View>
        <View className='at-col at-col-4 hot-spot-icon-list' onClick={this.changeData.bind(this, '4')}>
          <Image className='hot-spot-icon-list-image' src={`${BASEURL}ekjk.svg`} />
          <View className='at-article__p'>儿科健康</View>
        </View>
      </View>
    )
  }
}

HotSpotIcon.defaultProps={
  parent:null
};

export default HotSpotIcon
