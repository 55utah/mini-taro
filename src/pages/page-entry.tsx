// 页面的实例, 实现一个React组件

import React from 'react'
import { View, Text, Button, Input } from '../native-components'

export class EntryPageClass extends React.Component<{}, { name: string; count: number; list: { key: number; value: string }[]; show: boolean }> {

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      name: '',
      count: 0,
      list: [{key: 1, value: '这是第1个'}, { key: 2, value: '这是第2个' }, { key: 3, value: '这是第3个' }],
      show: false,
    }
  }

  public increment() {
    this.setState((state) => ({ count: state.count + 1 }))
  }

  public changeName(e: any) {
    const value = e?.detail?.value || ''
    this.setState({ name: value })
  }

  public add() {
    this.setState((state) => {
      const v = state.list.length + 1
      return { list: state.list.concat({ key: v, value: `这是第${v}个` }) }
    })
  }

  public delete() {
    if (this.state.list.length <= 1) return
    this.setState((state) => {
      return { list: state.list.slice(0, -1) }
    })
  }

  public go() {
    tt.navigateTo({
      url: '/pages/page-second/index'
    })
  }

  render() {
    return  <View className="wrapper">
      <View style={{ color: 'blue' }}>
        <Text style={{ fontSize: '28px', fontWeight: '600' }}>style样式</Text>
      </View>
      <View>列表</View>
      <View style={{ color: 'red' }}>
      {
        this.state.list.map(p => {
          return <View key={p.key}>{p.value}</View>
        })
      }
      </View>
      <View className="inline-block">
        <Button onClick={() => this.add()} type="warn">增加列表item</Button>
        <Button onClick={() => this.delete()} type="default">删除列表item</Button>
      </View>
      <View style={{ margin: '20px 0' }}>
        <Text>count: {this.state.count}</Text>
        <Button onClick={() => this.increment()} type="primary">数字加一</Button>
      </View>
      <View>
        <Text>name: {this.state.name}</Text>
        <Input style={{ border: '1px solid blue' }} onInput={(e) => this.changeName(e)} />
      </View>
      <View style={{ marginTop: '20px' }}>
        <Button type="default" onClick={() => this.go()}>去下一个页面</Button>
      </View>
    </View>
  }
}

