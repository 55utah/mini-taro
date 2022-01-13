import React from "react";
import { createAppConfig } from "./src/createAppConfig"


class AppComp extends React.Component {
  componentDidMount() {
    // ...
  }

  onLaunch(options: unknown) {
    console.warn('App onlaunch', options)
  }

  componentDidShow() {
    // ...
  }

  componentDidHide() {
    // ...
  }

  componentDidCatchError() {
    // ...
  }

  render() {
    return React.createElement('view', {}, this.props.children)
  }
}

/**
 * 
 * 这里在编译后的结果里面需要将
 * require('./vendors.js'); 
 * 放在顶层
 */

App(createAppConfig(AppComp))

