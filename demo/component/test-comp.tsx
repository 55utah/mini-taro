// 普通function组件

import React, { FC, useEffect, useState } from 'react'
import { View, Text } from '@/index'

const TestComp: FC<{}> = () => {
  const [num, setNum] = useState(1)
  useEffect(() => {
    // 2s 后更新数字
    setTimeout(() => {
      setNum(300)
    }, 2000)
  }, [])

  return <View style={{ color: 'blue', marginTop: '10px' }}>
    <Text>这里是function组件: </Text>
    <Text>{num}</Text>
  </View>
}

export default TestComp
