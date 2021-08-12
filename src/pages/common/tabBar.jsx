import Taro from '@tarojs/taro'
import {AtTabBar} from 'taro-ui'
import React, {Component} from 'react';
import {View, Image} from '@tarojs/components'

class TabBar extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      current: 0
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <View>
        <AtTabBar
          fixed={true}
          tabList={[
            {title: '首页', iconType: 'home'},
            {title: '今日热点', iconType: 'eye'},
            {title: '健康档案', iconType: 'heart'},
            {title: '我的', iconType: 'user'}
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}

export default TabBar
