"use strict";
(tt["webpackChunkmini_taro"] = tt["webpackChunkmini_taro"] || []).push([["pages/page-entry/index"],{

/***/ "./demo/pages/page-entry/index.css":
/*!*****************************************!*\
  !*** ./demo/pages/page-entry/index.css ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./build/page-entry.ts":
/*!*****************************!*\
  !*** ./build/page-entry.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const page_entry_1 = __webpack_require__(/*! ../demo/pages/page-entry */ "./demo/pages/page-entry/index.tsx");
const index_1 = __webpack_require__(/*! @/index */ "./src/index.ts");
Page((0, index_1.createPageConfig)(page_entry_1.EntryPage, { root: { nn: '' } }, { path: 'pages/page-entry/index' }));


/***/ }),

/***/ "./demo/pages/page-entry/index.tsx":
/*!*****************************************!*\
  !*** ./demo/pages/page-entry/index.tsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// function组件页面的实例
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntryPage = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const index_1 = __webpack_require__(/*! @/index */ "./src/index.ts");
const util_1 = __webpack_require__(/*! ../../util */ "./demo/util.ts");
__webpack_require__(/*! ./index.css */ "./demo/pages/page-entry/index.css");
const EntryPage = () => {
    const [name, setName] = (0, react_1.useState)('');
    const [count, setCount] = (0, react_1.useState)(0);
    const [list, setList] = (0, react_1.useState)([
        { key: 1, value: '这是第1个' },
        { key: 2, value: '这是第2个' },
        { key: 3, value: '这是第3个' },
    ]);
    (0, react_1.useEffect)(() => {
        console.log('[useEffect] Page Entry loaded!');
        return () => {
            console.log('[useEffect] Page Entry destroyed!');
        };
    }, []);
    // useReady Hook
    (0, index_1.useReady)(() => {
        console.log('[useReady] Page Entry ready');
    });
    // useDidShow
    (0, index_1.useDidShow)(() => {
        console.log('[useDidShow] Page Entry show');
    });
    // useDidHide
    (0, index_1.useDidHide)(() => {
        console.log('[useDidHide] Page Entry hide');
    });
    const increment = () => {
        setCount((val) => val + 1);
    };
    const changeName = (e) => {
        var _a;
        const value = ((_a = e === null || e === void 0 ? void 0 : e.detail) === null || _a === void 0 ? void 0 : _a.value) || '';
        setName(value);
    };
    const addItem = () => {
        setList((arr) => arr.concat({ key: arr.length + 1, value: `这是第${arr.length + 1}个` }));
    };
    const deleteItem = () => {
        setList((arr) => arr.length <= 1 ? arr : arr.slice(0, -1));
    };
    const go = () => {
        util_1.native.navigateTo({
            url: '/pages/page-second/index',
        });
    };
    return (react_1.default.createElement(index_1.View, { className: "wrapper" },
        react_1.default.createElement(index_1.View, { style: { color: 'blue' } },
            react_1.default.createElement(index_1.Text, { style: { fontSize: '25px', fontWeight: '600' } }, "style\u6837\u5F0F"),
            react_1.default.createElement(index_1.Text, { className: "class-sample" }, "css\u6837\u5F0F")),
        react_1.default.createElement(index_1.View, null, "\u5217\u8868"),
        react_1.default.createElement(index_1.View, { style: { color: 'red' } }, list.map((p) => {
            return react_1.default.createElement(index_1.View, { key: p.key }, p.value);
        })),
        react_1.default.createElement(index_1.View, { className: "inline-block" },
            react_1.default.createElement(index_1.Button, { onClick: () => addItem(), type: "warn" }, "\u589E\u52A0\u5217\u8868item"),
            react_1.default.createElement(index_1.Button, { onClick: () => deleteItem(), type: "default" }, "\u5220\u9664\u5217\u8868item")),
        react_1.default.createElement(index_1.View, { style: { margin: '20px 0' } },
            react_1.default.createElement(index_1.Text, null,
                "count: ",
                count),
            react_1.default.createElement(index_1.Button, { onClick: () => increment(), type: "primary" }, "\u6570\u5B57\u52A0\u4E00")),
        react_1.default.createElement(index_1.View, null,
            react_1.default.createElement(index_1.Text, null,
                "name: ",
                name),
            react_1.default.createElement(index_1.Input, { style: { border: '1px solid blue' }, onInput: (e) => changeName(e) })),
        react_1.default.createElement(index_1.View, { style: { marginTop: '20px' } },
            react_1.default.createElement(index_1.Button, { type: "default", onClick: () => go() }, "\u53BB\u4E0B\u4E00\u4E2A\u9875\u9762"))));
};
exports.EntryPage = EntryPage;


/***/ }),

/***/ "./demo/util.ts":
/*!**********************!*\
  !*** ./demo/util.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


// tt/wx/qq等顶层对象处理
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.native = void 0;
exports.native = ck1() || ck2() || ck3() || ck4() || ck5() || ck6() || error();
function ck1() { try {
    return tt;
}
catch (e) {
    return undefined;
} }
function ck2() { try {
    return wx;
}
catch (e) {
    return undefined;
} }
function ck3() { try {
    return qq;
}
catch (e) {
    return undefined;
} }
function ck4() { try {
    return jd;
}
catch (e) {
    return undefined;
} }
function ck5() { try {
    return my;
}
catch (e) {
    return undefined;
} }
function ck6() { try {
    return swan;
}
catch (e) {
    return undefined;
} }
function error() { throw new Error('未支持的小程序类型'); }


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
exports.getTaroElementById = exports.getTaroRootElementByUid = exports.createAppConfig = exports.PageContext = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const interface_1 = __webpack_require__(/*! ./interface */ "./src/interface.ts");
const render_1 = __webpack_require__(/*! ./render */ "./src/render.ts");
const taro_element_1 = __webpack_require__(/*! ./taro-element */ "./src/taro-element.ts");
const RootElement = new taro_element_1.TaroElement({
    id: Infinity,
    props: {},
    nodeName: 'view',
    type: interface_1.NodeType.ROOT,
});
const h = react_1.default.createElement;
const EMPTY_OBJ = {};
exports.PageContext = EMPTY_OBJ;
const connectReactPage = (id) => {
    return (component) => {
        if (exports.PageContext === EMPTY_OBJ) {
            exports.PageContext = react_1.default.createContext('');
        }
        return class Page extends react_1.default.Component {
            componentDidCatch(error, info) {
                if (true) {
                    console.warn(error);
                    console.error(info.componentStack);
                }
            }
            render() {
                // 名称是'root'的dom节点就是页面顶层节点了，在hostConfig中处理成不同节点
                return h('root', { pageId: id }, h(exports.PageContext.Provider, { value: id }, h(component, Object.assign({}, this.props))));
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
        unmount(id, cb) {
            const idx = this.elements.findIndex((item) => item.props.tid === id);
            this.elements.splice(idx, 1);
            this.forceUpdate(cb);
        }
        render() {
            while (this.pages.length > 0) {
                const page = this.pages.pop();
                this.elements.push(page());
            }
            const props = null;
            return react_1.default.createElement(App, props, this.elements.slice());
        }
    }
    const wrapper = (0, render_1.render)(react_1.default.createElement(AppWrapper), RootElement);
    const createConfig = () => {
        // app的配置不能是一个复杂对象。。
        const config = Object.create({
            mount: function (component, id, cb) {
                const page = connectReactPage(id)(component);
                wrapper.mount(page, id, cb);
            },
            unmount: function (id, cb) {
                wrapper.unmount(id, cb);
            },
            onLaunch: function (options) {
                console.warn('app onLaunch');
            },
            onShow: function (options) {
                //
            },
            onHide: function () {
                //
            },
            onError: function (msg) {
                console.log('app error', msg);
            },
            getTree: function () {
                return RootElement;
            },
        });
        return config;
    };
    return createConfig();
};
exports.createAppConfig = createAppConfig;
// 页面顶层元素是TaroRootElement props内包含一个pageId，值是当前页面路径
// 查找指定的页面root元素
function getTaroRootElementByUid(rootElement, uid) {
    var _a;
    const queue = [];
    let target = undefined;
    // 广度优先查找
    queue.push(rootElement);
    while (queue.length > 0) {
        const t = queue.shift();
        if (t.getAttribute('pageId') === uid) {
            target = t;
            break;
        }
        else {
            (_a = t.children) === null || _a === void 0 ? void 0 : _a.map((item) => queue.push(item));
        }
    }
    return target;
}
exports.getTaroRootElementByUid = getTaroRootElementByUid;
// 查找指定的页面内元素
function getTaroElementById(rootElement, id) {
    var _a;
    const queue = [];
    let target = undefined;
    queue.push(rootElement);
    while (queue.length > 0) {
        const t = queue.shift();
        if (t.getAttribute('uid') === id) {
            target = t;
            break;
        }
        else {
            (_a = t.children) === null || _a === void 0 ? void 0 : _a.map((item) => queue.push(item));
        }
    }
    return target;
}
exports.getTaroElementById = getTaroElementById;


/***/ }),

/***/ "./src/createPageConfig.ts":
/*!*********************************!*\
  !*** ./src/createPageConfig.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.taroHook = exports.createPageConfig = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const createAppConfig_1 = __webpack_require__(/*! ./createAppConfig */ "./src/createAppConfig.ts");
const util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
const createPageConfig = (Component, initData, pageConfig) => {
    const { path } = pageConfig;
    const pageUid = path;
    let app = null;
    try {
        app = getApp();
    }
    catch (e) {
        console.error(e);
    }
    const getPageElement = () => {
        const rootElement = app.getTree();
        return (0, createAppConfig_1.getTaroRootElementByUid)(rootElement, pageUid);
    };
    const getElement = (id) => {
        const rootElement = app.getTree();
        return (0, createAppConfig_1.getTaroElementById)(rootElement, id);
    };
    // 所有事件汇总到一个方法上
    const eventHandler = (e) => {
        // 这里使用currentTarget是为了避免被冒泡影响
        const { type: eventName, currentTarget = {} } = e || {};
        const { id = '' } = currentTarget;
        const pageElement = getPageElement();
        if (id && (pageElement === null || pageElement === void 0 ? void 0 : pageElement.ctx)) {
            const currentElement = getElement(id);
            if (!currentElement)
                return;
            currentElement.dispatchEvent(eventName, e);
        }
    };
    const createConfig = () => {
        const config = Object.create({
            data: initData,
            onLoad: function (options) {
                console.warn('page onLoad', options);
                // 小程序page实例
                const page = this;
                this.$taroPath = pageUid;
                app &&
                    app.mount(Component, this.$taroPath, () => {
                        const pageElement = getPageElement();
                        if (pageElement) {
                            pageElement.ctx = page;
                            pageElement.performUpdate();
                        }
                    });
            },
            onShow: function () {
                safeExecute('onShow', pageUid);
            },
            onHide: function () {
                safeExecute('onHide', pageUid);
            },
            onReady: function () {
                safeExecute('onReady', pageUid);
            },
            onUnload: function () {
                app &&
                    app.unmount(pageUid, () => {
                        console.warn(`page: ${pageUid} unmount`);
                    });
            },
            eh: eventHandler,
        });
        return config;
    };
    return createConfig();
};
exports.createPageConfig = createPageConfig;
const hooks = new Map();
function safeExecute(lifeCycle, uid) {
    // 这里可以将小程序生命周期hook执行
    if (!hooks.has(uid))
        return;
    const target = hooks.get(uid);
    const cb = target.get(lifeCycle);
    if (cb && (0, util_1.isFunction)(cb)) {
        cb.call(null);
    }
}
function taroHook(lifeCycle) {
    return (cb) => {
        // 这样拿到对应页面的uid
        const id = react_1.default.useContext(createAppConfig_1.PageContext);
        const cbRef = react_1.default.useRef(cb);
        react_1.default.useLayoutEffect(() => {
            if (!(0, util_1.isFunction)(cbRef.current))
                return;
            if (!hooks.has(id))
                hooks.set(id, new Map());
            const map = hooks.get(id);
            map.set(lifeCycle, cbRef.current);
        }, []);
    };
}
exports.taroHook = taroHook;


/***/ }),

/***/ "./src/hooks.ts":
/*!**********************!*\
  !*** ./src/hooks.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useDidHide = exports.useDidShow = exports.useReady = void 0;
/**
 * 这里实现的hook对应Taro提供的hook
 * 参考这些hook可以实现出任意需要的业务hook，比如useShareAppMessage，usePageScroll等
 */
const createPageConfig_1 = __webpack_require__(/*! ./createPageConfig */ "./src/createPageConfig.ts");
exports.useReady = (0, createPageConfig_1.taroHook)('onReady');
exports.useDidShow = (0, createPageConfig_1.taroHook)('onShow');
exports.useDidHide = (0, createPageConfig_1.taroHook)('onHide');


/***/ }),

/***/ "./src/host-config.ts":
/*!****************************!*\
  !*** ./src/host-config.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// 这边要借助 react-reconciler 实现一套虚拟dom树的系统
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactReconciler = exports.TaroReconciler = exports.updateProps = void 0;
const react_reconciler_1 = __importDefault(__webpack_require__(/*! react-reconciler */ "./node_modules/react-reconciler/index.js"));
exports.ReactReconciler = react_reconciler_1.default;
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
function isEventName(s) {
    return s[0] === 'o' && s[1] === 'n';
}
function setEvent(dom, name, value) {
    let eventName = name.toLowerCase().slice(2);
    if (eventName === 'click') {
        eventName = 'tap';
    }
    if (typeof value === 'function') {
        dom.addEventListener(eventName, value);
    }
    else {
        dom.removeEventListener(eventName);
    }
}
/**
 * 判断属性，处理属性
 */
function setProperty(dom, name, value, oldValue) {
    // className转class
    name = name === 'className' ? 'class' : name;
    if (name === 'key' ||
        name === 'children' ||
        name === 'ref') {
        // 跳过
    }
    else if (name === 'style') {
        // TODO 需要处理style的变化
    }
    else if (isEventName(name)) {
        // 事件 onClick等
        setEvent(dom, name, value);
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
const TaroReconciler = (0, react_reconciler_1.default)(hostConfig);
exports.TaroReconciler = TaroReconciler;


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
exports.styleTransform = exports.hydrate = exports.generateUid = void 0;
const interface_1 = __webpack_require__(/*! ./interface */ "./src/interface.ts");
const isEmpty = (children) => {
    return !children || (Array.isArray(children) && children.length === 0);
};
const generateUid = (id) => `u-${id}`;
exports.generateUid = generateUid;
/**
 *
 * 这个函数是将虚拟dom树转为了渲染属性树
 * @param node
 * @returns
 */
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
        return Object.assign({ ["cn" /* Childnodes */]: !!children && Array.isArray(children) ? children.map(exports.hydrate) : [], ["nn" /* NodeName */]: nodeName, ["cl" /* Class */]: className || '', ["st" /* Style */]: styleContent, uid: (0, exports.generateUid)(id) }, nextProps);
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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAppConfig = exports.createPageConfig = void 0;
var createPageConfig_1 = __webpack_require__(/*! ./createPageConfig */ "./src/createPageConfig.ts");
Object.defineProperty(exports, "createPageConfig", ({ enumerable: true, get: function () { return createPageConfig_1.createPageConfig; } }));
var createAppConfig_1 = __webpack_require__(/*! ./createAppConfig */ "./src/createAppConfig.ts");
Object.defineProperty(exports, "createAppConfig", ({ enumerable: true, get: function () { return createAppConfig_1.createAppConfig; } }));
__exportStar(__webpack_require__(/*! ./hooks */ "./src/hooks.ts"), exports);
__exportStar(__webpack_require__(/*! ./native-components */ "./src/native-components.ts"), exports);


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


// 基础组件实现
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
// 这里使用Taro的缩写
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
        this.__handlers = new Map();
        const { id, type, nodeName, props, children, text } = params;
        this.id = id;
        this.type = type;
        this.nodeName = nodeName;
        this.props = Object.assign({ uid: (0, hydrate_1.generateUid)(id) }, props);
        // props中的children是冗余数据
        if (this.props['children']) {
            delete this.props['children'];
        }
        this.children = children;
        this.text = text;
    }
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
    addEventListener(eventName, value) {
        this.__handlers.set(eventName, value);
    }
    removeEventListener(eventName) {
        this.__handlers.delete(eventName);
    }
    // 触发事件（忽略冒泡和捕获）
    // taro3内部会二次封装这个事件，处理冒泡等行为，此处简化
    dispatchEvent(eventName, e) {
        if (this.__handlers.has(eventName)) {
            const fn = this.__handlers.get(eventName);
            typeof fn === 'function' && fn(e);
        }
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
        console.warn('updatePayloads', [...this.updatePayloads]);
        if (!this.pendingUpdate && this.ctx !== null) {
            this.performUpdate();
        }
    }
    performUpdate() {
        this.pendingUpdate = true;
        // TODO 这里可以优化，将所有的复杂payloads合并为最小payloads，传给setData
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
exports.isFunction = exports.NodeTypeMap = exports.noop = exports.generate = exports.reset = void 0;
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
const isFunction = (target) => typeof target === 'function';
exports.isFunction = isFunction;


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./build/page-entry.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map