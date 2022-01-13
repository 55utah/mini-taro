import React, { ComponentClass } from "react"
import { getTaroRootElementByUid } from "./createAppConfig"
import { MiniData } from "./interface"
import { TaroRootElement } from "./taro-element"

export const createPageConfig = (Component: ComponentClass, initData: Record<string, unknown>, pageConfig: { path: string }) => {
  const { path } = pageConfig
  const pageUid = path

  let app: any = null
  try {
    app = getApp()
  } catch(e) {
    console.warn(e)
  }

  let pageElement: TaroRootElement | undefined
  const getPageElement = () => {
    const rootElement = (app as any).getTree()
    pageElement = getTaroRootElementByUid(rootElement, pageUid)
    return pageElement
  }

  const eventHandler = (e: any) => {
    // 这里要使用currentTarget避免被冒泡影响
    const { type, currentTarget = {} } = e || {}
    const { id = '' } = currentTarget
    const pageElement = getPageElement()
    if (id && pageElement?.ctx) {
      const ctx = pageElement?.ctx
      let propKey = ''
      switch(type) {
        case 'tap': propKey = 'onClick'; break;
        case 'input': propKey = 'onInput'; break;
        default: break;
      }
      if (propKey) {
        const data = getMiniDataByUid(ctx?.data?.root, id) as any
        const fn = data[propKey]
        typeof fn === 'function' && fn(e)
      }
    }
  }

  const createConfig = () => {
    const config = Object.create({
      element: Component,
      data: initData,
      onLoad: function (options: unknown){
        console.warn('page onLoad', options)
        // 小程序page实例
        const page = this
        this.$taroPath = pageUid
        app && app.mount(Component, this.$taroPath, () => {
          const pageElement = getPageElement()
          if (pageElement) {
            pageElement.ctx = page
            pageElement.performUpdate()
          }
          console.warn('app mounted')
        })
      },
      onShow: func('onShow'),
      onHide: func('onHide'),
      onReady: func('onReady'),
      onUnload: func('onUnload'),
      eh: eventHandler
    })

    return config
  }

  return createConfig()
}

function func(name: string) {
  return function (params: any) {
    console.warn(name, params)
  }
}

function getMiniDataByUid(root: { cn: MiniData[] }, uid: string): MiniData | undefined {
  const queue: MiniData[] = []
  queue.push(...(root?.cn || []))
  let target: MiniData | undefined = undefined
  while(queue.length > 0) {
    const t = queue.shift()!
    if ((t as any)?.uid === uid) {
      target = t
      break
    } else {
      (t as any).cn?.map((item: MiniData) => queue.push(item))
    }
  }
  return target
}
