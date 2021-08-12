import React, {Component} from 'react';
import PropTypes from "prop-types";
import Taro from '@tarojs/taro'
import {View, Image, RichText, ScrollView, Text} from '@tarojs/components'
import moment from 'moment'
import {NOIMAGEURL} from "../../constants/global";

class HotMedicineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      hotSpotMedicineList: [],
      chooseDataType: ''
    }
  }

  _onScrollToLower() {
    const {pageNum} = this.state;
    (this.state.chooseDataType != this.props.parent.state.chooseDataType) ?
      this.setState({
        pageNum: 2
      })
      :
      this.setState({
        pageNum: pageNum + 1
      });
    this.setState({
      chooseDataType: this.props.parent.state.chooseDataType
    });
    this.props.parent.reloadMedicineList(this.state.chooseDataType, this.state.pageNum)
  }

  /**
   * 查看热点医院详情
   */
  toHotHospitalMedicine(itemcode) {
    Taro.navigateTo({
      url: '/pages/hotSpot/hotSpotMedicineDetail?id=' + itemcode
    })
  }

  render() {
    let hotSpotMedicineList = this.props.hotSpotMedicineList;

    const scrollStyle = {
      height: '620px'
    };
    const scrollTop = 0;
    const Threshold = 250;

    return(
      <ScrollView
        className='hot-list'
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={scrollStyle}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToLower={this._onScrollToLower.bind(this)}
      >

        {
          (hotSpotMedicineList||[]).map((hotSpotMedicineItem,index)=>{
          return(
            <View>
              <View className='home-hot-content'>
                <View className='home-hot-item' onClick={this.toHotHospitalMedicine.bind(this,hotSpotMedicineItem.itemcode)}>
                  <View className='at-col at-col-4'>
                    <Image
                      className='hot-item-img'
                      src={hotSpotMedicineItem.filePath == null ? NOIMAGEURL:hotSpotMedicineItem.filePath}
                      mode='aspectFill'
                    />
                  </View>
                  <View className='hot-item-text'>
                    <View className='home-hot-text'>
                      <View className='home-hot-text-title-name'>
                        <Text className='home-hot-text-title'>{hotSpotMedicineItem.name}({hotSpotMedicineItem.alias})</Text>
                      </View>
                      <View className=''>
                        <Text className='home-hot-date'>{moment(hotSpotMedicineItem.itemcreateat).format("YYYY-MM-DD")}</Text>
                      </View>
                    </View>
                    <RichText nodes={"主治："+hotSpotMedicineItem.governance} className='home-hot-intro'/>
                  </View>
                </View>
              </View>
              {
                (index+1)==hotSpotMedicineItem.totalMedicineData?
                  <View className='home-hot-least-title'>
                    <Text className='home-hot-least-title-text'>我也是有底线的</Text>
                  </View>:''
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

HotMedicineItem.defaultProps = {
  hotSpotMedicineList:[],
  chooseDataType: ''
};
HotMedicineItem.propTypes = {
  hotSpotMedicineList: PropTypes.array.isRequired,
};
export default HotMedicineItem;
