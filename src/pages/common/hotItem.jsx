import React, {Component} from 'react';
import PropTypes from "prop-types";
import Taro from '@tarojs/taro'
import {View, Image, RichText, ScrollView, Text} from '@tarojs/components'
import {NOIMAGEURL} from "../../constants/global";
import './hotItem.less'

class HotItem extends Component{
  constructor(props){
    super(props);
    this.state={
      pageNum:1,
      pageSize:10,
      hotSpotList:[],
      //热点数据类型
      chooseDataType:''
    };
  }

  _onScrollToLower(){
    const {pageNum}=this.state;
    (this.state.chooseDataType!=this.props.parent.state.chooseDataType)?
      this.setState({
        hotSpotList:[],
        pageNum:2
      })
      :
      (this.props.parent.state.newPageDataType=='')?
        this.setState({
          pageNum:pageNum+1
        })
        :
        (this.props.parent.state.chooseDataType=='')?
          this.setState({
            pageNum:2
          })
          :
          (this.props.parent.state.newPageDataType== this.props.parent.state.chooseDataType)?
            this.setState({
              pageNum:pageNum+1
            })
            :
            this.setState({
              pageNum:2
            });
    this.props.parent.state.newPageDataType=this.state.chooseDataType;
    this.setState({
      chooseDataType:this.props.parent.state.chooseDataType
    });
    this.props.parent.reloadList(this.state.chooseDataType,this.state.pageNum)
  }

  /**
   * 查看热点医院详情
   */
  toHotHospitalDetail(itemcode){
    Taro.navigateTo({
      url:'/pages/hotSpot/hotSpotDetail?id='+itemcode
    })
  }

  render(){
    let hotSpotList=this.props.hotSpotList;
    const scrollStyle={
      height: '620px'
    };
    const scrollTop=0;
    const Threshold=250;
    return(
      <ScrollView
        className='hos-list'
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={scrollStyle}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToLower={this._onScrollToLower.bind(this)}
      >
        {
          (hotSpotList||[]).map((hotSpotItem,index)=>{
          return(
              <View>
                <View className='home-hot-content'>
                  <View className='home-hot-item'
                  onClick={this.toHotHospitalDetail.bind(this,hotSpotItem.itemcode)}>
                    <View >
                      <Image
                        className='hot-item-img'
                        src={hotSpotItem.filePath==null?NOIMAGEURL:hotSpotItem.filePath}
                        mode='aspectFill'
                      />
                    </View>
                    <View className='hot-item-text'>
                      <View className='home-hot-text'>
                        <View className='home-hot-text-title-name'>
                          <Text className='home-hot-text-title'>{hotSpotItem.hotspotTitle}</Text>
                        </View>
                        <View className=''>
                          <Text className='home-hot-date'>{hotSpotItem.itemcreateatString}</Text>
                        </View>
                      </View>
                      <RichText nodes={hotSpotItem.hotspotContent} className='home-hot-intro'/>
                    </View>
                  </View>
                </View>
                {
                  (index+1)==hotSpotItem.totalDate ?
                    <View className='home-hot-least-title'>
                      <Text className='home-hot-least-title-text'>我也是有底线的</Text>
                    </View> :''
                }
              </View>
              )
            }
          )
        }
      </ScrollView>
    );
  }
}
HotItem.defaultProps={
  hotSpotList:[],
  chooseDataType: ''
};
HotItem.propsTypes={
  hotSpotList:PropTypes.array.isRequired,
};
export default HotItem
