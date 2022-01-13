/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index2.ts":
/*!*******************!*\
  !*** ./index2.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const page_second_1 = __webpack_require__(/*! ./src/pages/page-second */ "./src/pages/page-second.tsx");
const createPageConfig_1 = __webpack_require__(/*! ./src/createPageConfig */ "./src/createPageConfig.ts");
Page((0, createPageConfig_1.createPageConfig)(page_second_1.SecondPageClass, { root: { nn: {} } }, { path: 'pages/page-second/index' }));


/***/ }),

/***/ "./src/createAppConfig.ts":
/*!********************************!*\
  !*** ./src/createAppConfig.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTaroRootElementByUid = exports.createAppConfig = exports.PageContext = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const interface_1 = __webpack_require__(/*! ./interface */ "./src/interface.ts");
const render_1 = __webpack_require__(/*! ./render */ "./src/render.ts");
const taro_element_1 = __webpack_require__(/*! ./taro-element */ "./src/taro-element.ts");
exports.PageContext = {};
const RootElement = new taro_element_1.TaroElement({ id: Infinity, props: {}, nodeName: 'view', type: interface_1.NodeType.ROOT });
const h = react_1.default.createElement;
const connectReactPage = (id) => {
    return (component) => {
        return class Page extends react_1.default.Component {
            componentDidCatch(err) {
                console.error('page global error: ', err);
            }
            render() {
                return h('root', { uid: id }, h(component, {}));
            }
        };
    };
};
const createAppConfig = (App) => {
    // 这个Wrapper就是一个代理，将小程序的更新代理到这个页面组件上，再将页面最近的更新setData回小程序
    class AppWrapper extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.pages = [];
            this.elements = [];
        }
        mount(component, id, cb) {
            const key = id;
            const page = () => h(component, { key, tid: id });
            this.pages.push(page);
            // 强制更新一次
            this.forceUpdate(cb);
        }
        // public unmount (id: string, cb: () => void) {
        //   const 
        //   this.forceUpdate(cb)
        // }
        render() {
            while (this.pages.length > 0) {
                const page = this.pages.pop();
                this.elements.push(page());
            }
            let props = null;
            return react_1.default.createElement(App, props, this.elements.slice());
        }
    }
    const wrapper = (0, render_1.render)(react_1.default.createElement(AppWrapper), RootElement);
    const createConfig = () => {
        // app的配置不能是一个复杂对象。。
        const config = Object.create({
            render: function (cb) {
                wrapper.forceUpdate(cb);
            },
            mount: function (component, id, cb) {
                const page = connectReactPage(id)(component);
                wrapper.mount(page, id, cb);
            },
            onLaunch: function (options) {
                console.warn('app onLaunch');
            },
            onShow: function (options) {
            },
            onHide: function () {
            },
            onError: function (msg) {
                console.log('app error', msg);
            },
            getTree: function () {
                return RootElement;
            }
        });
        return config;
    };
    return createConfig();
};
exports.createAppConfig = createAppConfig;
// 页面顶层元素是TaroRootElement props内包含一个uid是路径
function getTaroRootElementByUid(rootElement, uid) {
    var _a;
    const queue = [];
    let target = undefined;
    queue.push(rootElement);
    while (queue.length > 0) {
        const t = queue.shift();
        if (t.getAttribute('uid') === uid) {
            target = t;
            break;
        }
        else {
            (_a = t.children) === null || _a === void 0 ? void 0 : _a.map(item => queue.push(item));
        }
    }
    return target;
}
exports.getTaroRootElementByUid = getTaroRootElementByUid;


/***/ }),

/***/ "./src/createPageConfig.ts":
/*!*********************************!*\
  !*** ./src/createPageConfig.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPageConfig = void 0;
const createAppConfig_1 = __webpack_require__(/*! ./createAppConfig */ "./src/createAppConfig.ts");
const createPageConfig = (Component, initData, pageConfig) => {
    const { path } = pageConfig;
    const pageUid = path;
    let app = null;
    try {
        app = getApp();
    }
    catch (e) {
        console.warn(e);
    }
    let pageElement;
    const getPageElement = () => {
        const rootElement = app.getTree();
        pageElement = (0, createAppConfig_1.getTaroRootElementByUid)(rootElement, pageUid);
        return pageElement;
    };
    const eventHandler = (e) => {
        var _a;
        // 这里要使用currentTarget避免被冒泡影响
        const { type, currentTarget = {} } = e || {};
        const { id = '' } = currentTarget;
        const pageElement = getPageElement();
        if (id && (pageElement === null || pageElement === void 0 ? void 0 : pageElement.ctx)) {
            const ctx = pageElement === null || pageElement === void 0 ? void 0 : pageElement.ctx;
            let propKey = '';
            switch (type) {
                case 'tap':
                    propKey = 'onClick';
                    break;
                case 'input':
                    propKey = 'onInput';
                    break;
                default: break;
            }
            if (propKey) {
                const data = getMiniDataByUid((_a = ctx === null || ctx === void 0 ? void 0 : ctx.data) === null || _a === void 0 ? void 0 : _a.root, id);
                const fn = data[propKey];
                typeof fn === 'function' && fn(e);
            }
        }
    };
    const createConfig = () => {
        const config = Object.create({
            element: Component,
            data: initData,
            onLoad: function (options) {
                console.warn('page onLoad', options);
                // 小程序page实例
                const page = this;
                this.$taroPath = pageUid;
                app && app.mount(Component, this.$taroPath, () => {
                    const pageElement = getPageElement();
                    if (pageElement) {
                        pageElement.ctx = page;
                        pageElement.performUpdate();
                    }
                    console.warn('app mounted');
                });
            },
            onShow: func('onShow'),
            onHide: func('onHide'),
            onReady: func('onReady'),
            onUnload: func('onUnload'),
            eh: eventHandler
        });
        return config;
    };
    return createConfig();
};
exports.createPageConfig = createPageConfig;
function func(name) {
    return function (params) {
        console.warn(name, params);
    };
}
function getMiniDataByUid(root, uid) {
    var _a, _b;
    const queue = [];
    queue.push(...((root === null || root === void 0 ? void 0 : root.cn) || []));
    let target = undefined;
    while (queue.length > 0) {
        const t = queue.shift();
        if (((_a = t) === null || _a === void 0 ? void 0 : _a.uid) === uid) {
            target = t;
            break;
        }
        else {
            (_b = t.cn) === null || _b === void 0 ? void 0 : _b.map((item) => queue.push(item));
        }
    }
    return target;
}


/***/ }),

/***/ "./src/host-config.ts":
/*!****************************!*\
  !*** ./src/host-config.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// 这边要借助 react-reconciler 实现一套虚拟dom树的系统
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactReconciler = exports.TaroReconciler = exports.updateProps = void 0;
const ReactReconciler = __webpack_require__(/*! react-reconciler */ "./node_modules/react-reconciler/index.js");
exports.ReactReconciler = ReactReconciler;
const interface_1 = __webpack_require__(/*! ./interface */ "./src/interface.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
const taro_element_1 = __webpack_require__(/*! ./taro-element */ "./src/taro-element.ts");
function updateProps(dom, oldProps, newProps) {
    let i;
    for (i in oldProps) {
        if (!(i in newProps)) {
            setProperty(dom, i, null, oldProps[i]);
        }
    }
    for (i in newProps) {
        if (oldProps[i] !== newProps[i]) {
            setProperty(dom, i, newProps[i], oldProps[i]);
        }
    }
}
exports.updateProps = updateProps;
function setProperty(dom, name, value, oldValue) {
    // className转class
    name = name === 'className' ? 'class' : name;
    if (name === 'key' ||
        name === 'children' ||
        name === 'ref') {
        // 跳过
    }
    else if (name === 'style') {
        // TODO 处理style
    }
    else if (/^on[A-Z]+/.test(name)) {
        // 事件 onClick等 TODO 这里需要统一管理这些事件
        // 以onclick举例
        // if (name === 'onClick') {
        // 这里是另一种处理事件的方式
        // dom.setAttribute('bindtap', value as string)
        // }
    }
    else if (value == null) {
        dom.removeAttribute(name);
    }
    else {
        dom.setAttribute(name, value);
    }
}
const hostConfig = {
    createInstance(type, props, rootContainer, hostContext, internalHandle) {
        const conf = {
            id: (0, util_1.generate)(),
            type: util_1.NodeTypeMap[type] || interface_1.NodeType.VIEW,
            nodeName: type,
            props,
            children: [],
        };
        if (type === 'root') {
            return new taro_element_1.TaroRootElement(conf);
        }
        else {
            return new taro_element_1.TaroElement(conf);
        }
    },
    createTextInstance(text, rootContainer, hostContext, internalHandle) {
        const vnode = new taro_element_1.TaroText({
            id: (0, util_1.generate)(),
            type: interface_1.NodeType.TEXT,
            nodeName: 'text',
            props: {},
            text,
        });
        return vnode;
    },
    getPublicInstance(inst) {
        return inst;
    },
    getRootHostContext() {
        return {};
    },
    getChildHostContext() {
        return {};
    },
    appendChild(parent, child) {
        parent.appendChild(child);
    },
    appendInitialChild(parent, child) {
        parent.appendChild(child);
    },
    appendChildToContainer(parent, child) {
        parent.appendChild(child);
    },
    removeChild(parent, child) {
        parent.removeChild(child);
    },
    removeChildFromContainer(parent, child) {
        parent.removeChild(child);
    },
    insertBefore(parent, child, refChild) {
        parent.insertBefore(child, refChild);
    },
    insertInContainerBefore(parent, child, refChild) {
        parent.insertBefore(child, refChild);
    },
    commitTextUpdate(textInst, _, newText) {
        textInst.textContext = newText;
    },
    finalizeInitialChildren(dom, _, props) {
        updateProps(dom, {}, props);
        return false;
    },
    prepareUpdate() {
        return [];
    },
    commitUpdate(dom, _payload, _type, oldProps, newProps) {
        updateProps(dom, oldProps, newProps);
    },
    clearContainer(element) {
        if (element.children && element.children.length > 0) {
            element.children = [];
        }
    },
    shouldSetTextContent: () => false,
    prepareForCommit(..._) { return null; },
    resetAfterCommit: util_1.noop,
    commitMount: util_1.noop,
    now: () => Date.now(),
    cancelTimeout: clearTimeout,
    scheduleTimeout: setTimeout,
    preparePortalMount: util_1.noop,
    noTimeout: -1,
    supportsMutation: true,
    supportsPersistence: false,
    isPrimaryRenderer: true,
    supportsHydration: false
};
const TaroReconciler = ReactReconciler(hostConfig);
exports.TaroReconciler = TaroReconciler;
TaroReconciler.injectIntoDevTools({
    bundleType: 1,
    version: '0.0.1',
    rendererPackageName: 'mini-taro'
});


/***/ }),

/***/ "./src/hydrate.ts":
/*!************************!*\
  !*** ./src/hydrate.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.styleTransform = exports.hydrate = void 0;
const interface_1 = __webpack_require__(/*! ./interface */ "./src/interface.ts");
const isEmpty = (children) => {
    return !children || (Array.isArray(children) && children.length === 0);
};
const hydrate = (node) => {
    if (node.type === interface_1.NodeType.TEXT && isEmpty(node.children)) {
        return {
            ["v" /* Text */]: node.text || '',
            ["nn" /* NodeName */]: node.nodeName,
        };
    }
    else {
        const { nodeName, props, id, children } = node;
        const _a = props || {}, { className, style, children: _children } = _a, nextProps = __rest(_a, ["className", "style", "children"]);
        // style字符串化 + 驼峰转横线
        let styleContent = '';
        if (!!style) {
            for (const [key, value] of Object.entries(style)) {
                styleContent += `${(0, exports.styleTransform)(key)}: ${value};`;
            }
        }
        return Object.assign({ ["cn" /* Childnodes */]: !!children && Array.isArray(children) ? children.map(exports.hydrate) : [], ["nn" /* NodeName */]: nodeName, ["cl" /* Class */]: className || '', ["st" /* Style */]: styleContent, uid: `u-${id}` }, nextProps);
    }
};
exports.hydrate = hydrate;
// fontSize -> font-size
const styleTransform = (name) => {
    const list = name.split('');
    const index = list.findIndex(p => /[A-Z]/.test(p));
    if (index >= 0)
        list.splice(index, 1, '-' + list[index].toLowerCase());
    return list.join('');
};
exports.styleTransform = styleTransform;


/***/ }),

/***/ "./src/interface.ts":
/*!**************************!*\
  !*** ./src/interface.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


// import { VNode } from "./vnode"
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeType = void 0;
var NodeType;
(function (NodeType) {
    NodeType[NodeType["ROOT"] = 0] = "ROOT";
    NodeType[NodeType["TEXT"] = 1] = "TEXT";
    NodeType[NodeType["VIEW"] = 2] = "VIEW";
})(NodeType || (NodeType = {}));
exports.NodeType = NodeType;


/***/ }),

/***/ "./src/native-components.ts":
/*!**********************************!*\
  !*** ./src/native-components.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// 原生组件实现
// 原生组件实际就是react组件，名称上与小程序组件对齐
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Input = exports.Button = exports.Text = exports.View = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const createNativeComponent = (name, props) => {
    return (params) => {
        const _a = params || {}, { children } = _a, nextParams = __rest(_a, ["children"]);
        return react_1.default.createElement(name, Object.assign({}, nextParams), children);
    };
};
exports.View = createNativeComponent('view', {});
exports.Text = createNativeComponent('text', {});
exports.Button = createNativeComponent('button', {});
exports.Input = createNativeComponent('input', {});


/***/ }),

/***/ "./src/pages/page-second.tsx":
/*!***********************************!*\
  !*** ./src/pages/page-second.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// 页面的实例, 实现一个React组件
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SecondPageClass = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const native_components_1 = __webpack_require__(/*! ../native-components */ "./src/native-components.ts");
class SecondPageClass extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '这里是子页面'
        };
    }
    returnEntry() {
        tt.navigateBack();
    }
    render() {
        return react_1.default.createElement(native_components_1.View, { className: "wrapper" },
            react_1.default.createElement(native_components_1.Text, null, this.state.text),
            react_1.default.createElement(native_components_1.Button, { onClick: () => this.returnEntry() }, "\u8FD4\u56DE\u4E0A\u9875\u9762"));
    }
}
exports.SecondPageClass = SecondPageClass;


/***/ }),

/***/ "./src/render.ts":
/*!***********************!*\
  !*** ./src/render.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// 这边要借助 react-reconciler 实现一套虚拟dom树的系统
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.render = void 0;
const host_config_1 = __webpack_require__(/*! ./host-config */ "./src/host-config.ts");
const render = (component, container) => {
    if (!container._rootContainer) {
        container._rootContainer = host_config_1.TaroReconciler.createContainer(container, 0, false, null);
    }
    host_config_1.TaroReconciler.updateContainer(component, container._rootContainer, null);
    return host_config_1.TaroReconciler.getPublicRootInstance(container._rootContainer);
};
exports.render = render;


/***/ }),

/***/ "./src/short-cut.ts":
/*!**************************!*\
  !*** ./src/short-cut.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Short = exports.RootName = void 0;
exports.RootName = 'root';
var Short;
(function (Short) {
    Short["Container"] = "container";
    Short["Childnodes"] = "cn";
    Short["Text"] = "v";
    Short["NodeType"] = "nt";
    Short["NodeName"] = "nn";
    Short["Style"] = "st";
    Short["Class"] = "cl";
    Short["Src"] = "src";
})(Short = exports.Short || (exports.Short = {}));


/***/ }),

/***/ "./src/taro-element.ts":
/*!*****************************!*\
  !*** ./src/taro-element.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaroRootElement = exports.TaroText = exports.TaroElement = void 0;
const short_cut_1 = __webpack_require__(/*! ./short-cut */ "./src/short-cut.ts");
const hydrate_1 = __webpack_require__(/*! ./hydrate */ "./src/hydrate.ts");
class TaroElement {
    constructor(params) {
        this.parentNode = null;
        const { id, type, nodeName, props, children, text } = params;
        this.id = id;
        this.type = type;
        this.nodeName = nodeName;
        this.props = Object.assign({}, props);
        this.children = children;
        this.text = text;
    }
    // dispatchEvent(e: any) {
    //   console.warn('event', e)
    // }
    onAttributeUpdate() {
        var _a, _b, _c;
        if (!this.parentNode)
            return;
        const index = (_a = this.parentNode.children) === null || _a === void 0 ? void 0 : _a.findIndex((p) => p.id === this.id);
        if (!index || index < 0)
            return;
        (_b = this._root) === null || _b === void 0 ? void 0 : _b.enqueueUpdate({
            path: `${(_c = this.parentNode) === null || _c === void 0 ? void 0 : _c._path}.${"cn" /* Childnodes */}[${index}]`,
            value: (0, hydrate_1.hydrate)(this),
        });
    }
    setAttribute(name, value) {
        this.props[name] = value;
        this.onAttributeUpdate();
    }
    getAttribute(name) {
        return this.props[name];
    }
    removeAttribute(name) {
        if (name in this.props) {
            delete this.props[name];
            this.onAttributeUpdate();
        }
    }
    get _path() {
        const parentNode = this.parentNode;
        if (!parentNode || !Array.isArray(parentNode.children))
            return '';
        const index = parentNode.children.findIndex((p) => p.id === this.id);
        return `${parentNode._path}.${"cn" /* Childnodes */}[${index}]`;
    }
    get _root() {
        var _a;
        return ((_a = this.parentNode) === null || _a === void 0 ? void 0 : _a._root) || null;
    }
    appendChild(child) {
        var _a;
        child.parentNode = this;
        if (!this.children) {
            this.children = [child];
        }
        else {
            this.children.push(child);
        }
        (_a = this._root) === null || _a === void 0 ? void 0 : _a.enqueueUpdate({
            path: `${this._path}.${"cn" /* Childnodes */}`,
            value: this.children.map(hydrate_1.hydrate),
        });
    }
    insertBefore(child, beforeChild) {
        var _a;
        if (!this.children)
            return;
        const index = this.children.findIndex((item) => item.id === beforeChild.id);
        if (index < 0)
            return;
        child.parentNode = this;
        this.children.splice(index, 0, child);
        (_a = this._root) === null || _a === void 0 ? void 0 : _a.enqueueUpdate({
            path: `${this._path}.${"cn" /* Childnodes */}`,
            value: this.children.map(hydrate_1.hydrate),
        });
    }
    removeChild(child) {
        var _a;
        if (!this.children)
            return;
        const index = this.children.findIndex((item) => item.id === child.id);
        if (index < 0)
            return;
        this.children.splice(index, 1);
        (_a = this._root) === null || _a === void 0 ? void 0 : _a.enqueueUpdate({
            path: `${this._path}.${"cn" /* Childnodes */}`,
            value: this.children.map(hydrate_1.hydrate),
        });
    }
}
exports.TaroElement = TaroElement;
class TaroText extends TaroElement {
    constructor(params) {
        super(params);
        this.nodeName = '#text';
    }
    set textContext(text) {
        var _a;
        this.text = text;
        (_a = this._root) === null || _a === void 0 ? void 0 : _a.enqueueUpdate({
            path: `${this._path}.${"v" /* Text */}`,
            value: text,
        });
    }
}
exports.TaroText = TaroText;
class TaroRootElement extends TaroElement {
    constructor(params) {
        super(params);
        this.updatePayloads = [];
        this.ctx = null;
        this.pendingUpdate = false;
    }
    get _root() {
        return this;
    }
    // 页面顶层root节点让_path返回顶层名称
    get _path() {
        return short_cut_1.RootName;
    }
    enqueueUpdate(payload) {
        this.updatePayloads.push(payload);
        if (!this.pendingUpdate && this.ctx !== null) {
            this.performUpdate();
        }
        console.warn('updatePayloads', [...this.updatePayloads]);
    }
    performUpdate() {
        this.pendingUpdate = true;
        // TODO 将所有的payloads合并为setData的一个参数，传给setData
        const elements = [];
        while (this.updatePayloads.length > 0) {
            const item = this.updatePayloads.shift();
            elements.push(item);
        }
        console.warn('setData before', elements, this.ctx);
        Promise.resolve().then(() => {
            var _a;
            while (elements.length > 0) {
                const item = elements.shift();
                const { path, value } = item;
                (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.setData({ [path]: value }, () => {
                    console.warn('setData end');
                });
            }
            this.pendingUpdate = false;
        });
    }
}
exports.TaroRootElement = TaroRootElement;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NodeTypeMap = exports.noop = exports.generate = exports.reset = void 0;
const interface_1 = __webpack_require__(/*! ./interface */ "./src/interface.ts");
let instanceId = 0;
function reset() {
    instanceId = 0;
}
exports.reset = reset;
function generate() {
    const id = instanceId;
    instanceId += 1;
    return id;
}
exports.generate = generate;
const noop = () => { };
exports.noop = noop;
exports.NodeTypeMap = {
    'view': interface_1.NodeType.VIEW,
    'text': interface_1.NodeType.TEXT,
    'root': interface_1.NodeType.ROOT
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"pages/page-second/index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = tt["webpackChunkmini_taro"] = tt["webpackChunkmini_taro"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./index2.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map