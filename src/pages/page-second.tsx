// 页面的实例, 实现一个React组件

import React from 'react'
import { View, Text, Button } from '../native-components'

export class SecondPageClass extends React.Component<{}, { text: string }> {

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      text: '这里是子页面'
    }
  }

  public returnEntry() {
    tt.navigateBack()
  }

  render() {
    return  <View className="wrapper">
      <Text>{this.state.text}</Text>
      <Button onClick={() => this.returnEntry()}>返回上页面</Button>
    </View>
  }
}

