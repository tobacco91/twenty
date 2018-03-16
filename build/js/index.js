/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	global.Twenty = __webpack_require__(1).default;
	var child = Twenty.registerComponent('child', {
	    props: ['trans'],
	    templete: function templete() {
	        return '<div ref="div">\n            <h2 ref="h2">child</h2>\n            <h1>{{abcd}}</h1>\n            <p>{{trans}}</p>\n        </div>';
	    },
	    data: {
	        abcd: 'abc child'
	    },
	    didMount: function didMount() {
	        // setTimeout(() => {
	        //     child.setState({
	        //         abcd: 'abc child2'
	        //     })
	        // }, 1000);

	        console.log(this.data.a, this.refs.h2);
	    }
	});

	var parent = Twenty.registerComponent('parent', {
	    templete: function templete() {
	        return '<div ref="div">\n            <h2 ref="h2" >parent</h2>\n            <h2>{{a}}</h2>\n            <h1 onclick="{{ func }}">{{abcd}}</h1>\n            <component data-from="child" trans="{{trans}}"></component>\n        </div>';
	    },
	    data: {
	        trans: 'transparent',
	        // a: 'parent a 传递给 child',
	        abcd: '点击我',
	        a: '第二个改变',
	        func: function func() {
	            //console.log('parent')
	            parent.setState({
	                trans: 'change'
	            });
	            parent.setState({
	                abcd: 'abcd'
	            });
	            parent.setState({
	                abcd: '点击我 2',
	                a: '第二个改变 2'
	            });
	        }
	    },
	    didMount: function didMount() {
	        console.log(this, 'state');
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _baseWatcher = __webpack_require__(2);

	var _baseWatcher2 = _interopRequireDefault(_baseWatcher);

	var _registerComponent2 = __webpack_require__(10);

	var _registerComponent3 = _interopRequireDefault(_registerComponent2);

	var _utilityFunc = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    watch: function watch(element, data) {
	        return new _baseWatcher2.default(element, data, null, (0, _utilityFunc.random)(), 0, null, null);
	    },
	    registerComponent: function registerComponent(key, component) {
	        return new _registerComponent3.default(key, component);
	    }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilityFunc = __webpack_require__(3);

	var _model = __webpack_require__(4);

	var _elementWatcher = __webpack_require__(5);

	var _elementWatcher2 = _interopRequireDefault(_elementWatcher);

	var _textWatcher = __webpack_require__(8);

	var _textWatcher2 = _interopRequireDefault(_textWatcher);

	var _componentWatcher = __webpack_require__(9);

	var _componentWatcher2 = _interopRequireDefault(_componentWatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseWatcher = function () {
	  //元素 数据 上一个元素watcher 本组件的随机数 本元素的排序数 所属组件 父元素Watcher
	  function BaseWatcher(element, nowData) {
	    var previous = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	    var modelId = arguments[3];
	    var nowId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
	    var component = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
	    var parent = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

	    _classCallCheck(this, BaseWatcher);

	    this.element = element;
	    this.nowData = nowData;
	    this.previous = previous;
	    this.modelId = modelId;
	    this.nowId = nowId;
	    this.component = component;
	    this.parent = parent;
	    this.domInformation = this.getDomInformation();
	    this.nowType = this.getType();
	    this.nowWatcher = this.getWatcher();
	    this.keyList = [];
	    this.resetList = [];
	    this.timer = null;
	    // this.setState = this.updateRender;
	    this.setModel();
	    this.render();
	  }

	  _createClass(BaseWatcher, [{
	    key: 'render',
	    value: function render() {
	      this.nowWatcher.render();
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var changeData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      this.nowWatcher.reset(changeData);
	    }
	    // updateRender(changeData) {
	    //     let resetList = []
	    //     let watcherArr = [];
	    //     for(let key in changeData) {
	    //         if(changeData[key] !== this.nowData[key]){
	    //             // console.log(this.nowData[key], changeData[key], this.component)
	    //             this.nowData[key] = changeData[key]
	    //             watcherArr = get(this.modelId, key);
	    //             //console.log(model[this.modelId],key)
	    //             resetList = watcherArr ? resetList.concat(get(this.modelId, key)) : resetList;
	    //         }
	    //     }
	    //     return resetList;
	    // }

	  }, {
	    key: 'getKeyList',
	    value: function getKeyList(changeData) {
	      var keyList = [];
	      for (var key in changeData) {
	        if (changeData[key] !== this.nowData[key]) {
	          this.nowData[key] = changeData[key];
	          keyList.push(key);
	        }
	      }
	      return this.keyList.concat(keyList);
	    }
	  }, {
	    key: 'getRestList',
	    value: function getRestList(keyList) {
	      var _this = this;

	      var watcherArr = [];
	      var resetList = [];
	      keyList.length && keyList.forEach(function (key) {
	        watcherArr = (0, _model.get)(_this.modelId, key);
	        resetList = watcherArr ? resetList.concat((0, _model.get)(_this.modelId, key)) : resetList;
	      });
	      return resetList;
	    }
	  }, {
	    key: 'setState',
	    value: function setState(changeData) {
	      var _this2 = this;

	      this.keyList = this.getKeyList(changeData);
	      console.log(changeData);
	      clearTimeout(this.timer);
	      this.timer = setTimeout(function () {
	        _this2.resetList = _this2.getRestList(_this2.keyList);
	        console.log('aaaaa', _this2.resetList);
	        if (_this2.resetList.length !== 0) {
	          _this2.resetList.forEach(function (item) {
	            item.reset();
	          });
	          _this2.keyList = [];
	        }
	      }, 0);
	      // this.resetList = this.updateRender(changeData)
	      // clearTimeout(this.timer)
	      // this.time = setTimeout(() => {
	      //     console.log('aaaaaa')
	      //     if(this.resetList.length !== 0) {
	      //         this.resetList.forEach(item => {
	      //             item.reset();
	      //         })
	      //     }
	      // },0)
	    }
	  }, {
	    key: 'getDomInformation',
	    value: function getDomInformation() {
	      return {
	        dataset: this.element.dataset,
	        attr: this.element.attributes ? (0, _utilityFunc.toArray)(this.element.attributes) : [],
	        textContent: this.element.textContent,
	        parentNode: this.element.parentNode,
	        nextSibling: this.element.nextSibling
	      };
	    }
	  }, {
	    key: 'setModel',
	    value: function setModel() {
	      var _this3 = this;

	      var model = this.nowWatcher.model;
	      if (model && model.length !== 0) {
	        model.forEach(function (item) {
	          (0, _model.set)(_this3.modelId, item.name ? item.name : item, _this3);
	        });
	      }
	    }
	  }, {
	    key: 'removeAttr',
	    value: function removeAttr(name) {
	      this.element.removeAttribute(name);
	    }
	  }, {
	    key: 'setAttr',
	    value: function setAttr(name, value) {
	      this.element.setAttribute(name, value);
	    }
	  }, {
	    key: 'getNowId',
	    value: function getNowId(i) {
	      return this.nowId + '.' + i;
	    }
	  }, {
	    key: 'getType',
	    value: function getType() {
	      var NODE_TYPE = this.element.nodeType;
	      var NODE_NAME = this.element.nodeName.toLowerCase();
	      if (this.element.nodeType === 3) {
	        return BaseWatcher.TextWatcherType;
	      } else if (NODE_NAME === BaseWatcher.ComponentName) {
	        return BaseWatcher.ComponentWatcherType;
	      } else if (this.domInformation.dataset.hasOwnProperty(BaseWatcher.ManagerSign)) {
	        return BaseWatcher.ManagerWatcherType;
	      } else {
	        return BaseWatcher.ElementWatcherType;
	      }
	    }
	  }, {
	    key: 'execInstructions',
	    value: function execInstructions(statement) {
	      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.nowData;

	      //return this.nowData[statement];
	      return new Function('data', 'with(data) { return ' + statement + ';}')(data);
	    }
	  }, {
	    key: 'filterAttr',
	    value: function filterAttr() {
	      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      return this.domInformation.attr.filter(function (item) {
	        return type ? list.indexOf(item.name) > -1 : list.indexOf(item.name) === -1;
	      });
	    }
	  }, {
	    key: 'getWatcher',
	    value: function getWatcher() {
	      var watcher = null;
	      switch (this.nowType) {
	        case BaseWatcher.ElementWatcherType:
	          watcher = _elementWatcher2.default;
	          break;
	        case BaseWatcher.TextWatcherType:
	          watcher = _textWatcher2.default;
	          break;
	        case BaseWatcher.ComponentWatcherType:
	          watcher = _componentWatcher2.default;
	          break;
	        default:
	          //console.log(this.element,this.nowType)
	          throw new TypeError('type Type errors,can only be Element/text/Manager/component');
	      }
	      return new watcher(this);
	    }
	  }]);

	  return BaseWatcher;
	}();

	BaseWatcher.ManagerWatcherType = 1;
	BaseWatcher.ElementWatcherType = 2;
	BaseWatcher.TextWatcherType = 3;
	BaseWatcher.ComponentWatcherType = 4;
	BaseWatcher.ComponentName = 'component';
	BaseWatcher.ManagerSign = 'each';
	exports.default = BaseWatcher;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toArray = toArray;
	exports.random = random;
	function toArray(data) {
	  return [].slice.call(data);
	}
	function random() {
	  return Date.now() + Math.random();
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.model = undefined;
	exports.set = set;
	exports.get = get;

	var _baseWatcher = __webpack_require__(2);

	var _baseWatcher2 = _interopRequireDefault(_baseWatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var model = exports.model = {};
	//console.log(model)
	function set(modelId, key, watcher) {
	    if (!model[modelId]) {
	        model[modelId] = {};
	    }
	    if (!(watcher instanceof _baseWatcher2.default)) {
	        throw new TypeError('watcher type must be basewatcher');
	    }
	    if (model[modelId][key]) {
	        model[modelId][key].push(watcher);
	    } else {
	        model[modelId][key] = [watcher];
	    }
	}

	function get(modelId, key) {
	    return model[modelId] && model[modelId][key];
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _event = __webpack_require__(6);

	var _utilityFunc = __webpack_require__(3);

	var _modelParse = __webpack_require__(7);

	var _baseWatcher = __webpack_require__(2);

	var _baseWatcher2 = _interopRequireDefault(_baseWatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ElementWatcher = function () {
	    function ElementWatcher(base) {
	        _classCallCheck(this, ElementWatcher);

	        this.base = base;
	        this.instructionsList = this.getDataset(); //{name:data-if,value:a>b,reslove:false}
	        this.model = this.getModel(); //获取 a>b 中的a b
	        this.renderInf = null; //是否渲染
	        this.childWatcherList = [];
	        this.events = null; //{type :click,func:mesg(e)}
	        this.setNowId();
	    }

	    _createClass(ElementWatcher, [{
	        key: 'render',
	        value: function render() {
	            this.renderInf = this.getRenderInfo();
	            this.events = this.getEvents();
	            if (this.renderInf.renderInstructions) {
	                this[ElementWatcher.instructionsHandle[this.instructionsList.name]](this.instructionsList.resolve);
	                if (!this.renderInf.renderShould) {
	                    this.base.element.style.display = 'none';
	                } else {
	                    this.bindEvents();
	                    this.childWatcher();
	                }
	            } else {
	                this.bindEvents();
	                this.childWatcher();
	            }
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.instructionsList && (this.instructionsList.resolve = this.base.execInstructions(this.instructionsList.value));
	            this.render();
	        }
	    }, {
	        key: 'childWatcher',
	        value: function childWatcher() {
	            var _this = this;

	            var previousWatcher = null;
	            // console.log(this.BaseWatcher)
	            this.childWatcherList = (0, _utilityFunc.toArray)(this.base.element.childNodes).map(function (element, index) {
	                var childWatcher = new _baseWatcher2.default(element, _this.base.nowData, previousWatcher, _this.base.modelId, _this.base.getNowId(index), _this.base.component, _this.base);
	                previousWatcher = childWatcher;
	                return childWatcher;
	            });
	        }
	    }, {
	        key: 'getDataset',
	        value: function getDataset() {
	            var _this2 = this;

	            return this.base.filterAttr(ElementWatcher.instructions).map(function (item) {
	                _this2.base.removeAttr(item.name);
	                return { name: item.name, value: item.value, resolve: _this2.base.execInstructions(item.value) };
	            })[0];
	        }
	    }, {
	        key: 'getRenderInfo',
	        value: function getRenderInfo() {
	            var renderInstructions = true;
	            if (this.instructionsList === undefined) {
	                renderInstructions = false;
	            }
	            return {
	                renderInstructions: renderInstructions,
	                renderShould: true
	            };
	        }
	    }, {
	        key: 'setNowId',
	        value: function setNowId() {
	            this.base.setAttr('data-now-id', this.base.nowId);
	        }
	    }, {
	        key: 'getModel',
	        value: function getModel() {
	            if (this.instructionsList) {
	                return (0, _modelParse.modelParse)(this.instructionsList.value);
	            }
	        }
	    }, {
	        key: 'getEvents',
	        value: function getEvents() {
	            var _this3 = this;

	            return this.base.filterAttr(_event.EVENT_TYPE).map(function (item) {
	                _this3.base.removeAttr(item.name);
	                return { type: item.name, func: (0, _modelParse.modelParse)(item.value)[0] };
	            });
	        }
	    }, {
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this4 = this;

	            this.events.forEach(function (item) {
	                //console.log(this.base.execInstructions(item.func))
	                (0, _event.pushEventPool)(_this4.base.element, item.type, _this4.base.execInstructions(item.func));
	            });
	        }
	    }, {
	        key: 'handleIf',
	        value: function handleIf(value) {
	            if (!value) {
	                this.renderInf.renderShould = false;
	            }
	        }
	    }, {
	        key: 'handleElse',
	        value: function handleElse(value) {
	            var previousWatcher = this.base.previous;
	            while (previousWatcher) {
	                if (previousWatcher.nowType === _baseWatcher2.default.ElementWatcher) {
	                    if (previousWatcher.domInformation.dataset.hasOwnProperty('if')) {
	                        break;
	                    } else if (previousWatcher.domInformation.dataset.hasOwnProperty('elseIf') && previousWatcher.nowWatcher.instructionsList.resolve) {
	                        break;
	                    }
	                }
	                previousWatcher = previousWatcher.previous;
	            }
	            //如果之前有ELSEif或者if为true 则这个else节点不渲染
	            if (previousWatcher && previousWatcher.nowWatcher.instructionsList.resolve) {
	                this.renderInf.renderShould = false;
	            }
	        }
	    }]);

	    return ElementWatcher;
	}();

	ElementWatcher.instructionsHandle = {
	    'data-if': 'handleIf',
	    'data-else': 'handleElse',
	    'data-if-else': 'handleIfElse'
	};
	ElementWatcher.instructions = ['data-if', 'data-else', 'data-if-else'];
	exports.default = ElementWatcher;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.pushEventPool = pushEventPool;
	var EVENT_TYPE = exports.EVENT_TYPE = ['onafterprint', 'onbeforeprint', 'onbeforeunload', 'onerror', 'onhaschange', 'onload', 'onmessage', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpopstate', 'onredo', 'onresize', 'onstorage', 'onundo', 'onunload', 'onblur', 'onchange', 'oncontextmenu', 'onfocus', 'onformchange', 'onforminput', 'oninvalid', 'onreset', 'onselect', 'onsubmit', 'onkeydown', 'onkeypress', 'onkeyup', 'onclick', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onscroll', 'onabort', 'oncanplay', 'oncanplaythrough', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreadystatechange', 'onseeked', 'onseeking', 'onstalled', 'onsuspend', 'ontimeupdate', 'onvolumechange', 'onwaiting', 'abort', 'blur'];

	var eventPool = {};
	function pushEventPool(element, eventType, eventHandle) {
	    element.addEventListener(eventType.slice(2), eventHandle);
	}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.modelParse = modelParse;
	exports.innerHTMLParse = innerHTMLParse;
	// export const CONST_STRING = 'constString';
	// export const VAR_STRING = 'varString';
	var VAR = /[a-zA-Z_0-9]+/g;
	//const VAR_INNERHTML = /(?:\s*{{\s*)([a-zA-Z_0-9]+)(?:\s*}}\s*)/g;
	var PARSE_START = '{{';
	var PARSE_END = '}}';
	function checkVar(parseMark) {
	    return function (s, index) {
	        var i = 0,
	            len = parseMark.length;
	        for (; i < len; i++, index++) {
	            if (s[index] !== parseMark[i]) return false;
	        }
	        return true;
	    };
	}
	var checkStart = checkVar(PARSE_START);
	var checkEnd = checkVar(PARSE_END);
	function modelParse(str) {
	    var res = str.match(VAR);
	    return res;
	}
	function innerHTMLParse(str) {
	    var len = str.length,
	        i = 0,
	        start = false,
	        end = false,
	        continueInfo = false,
	        ifVar = false,
	        arr = [],
	        arrIndex = -1;
	    while (i < len) {
	        start = checkStart(str, i);
	        end = checkEnd(str, i);
	        if (start === true && end === false) {
	            ++arrIndex;
	            arr[arrIndex] = { ifVar: true, name: str[i + 2] };
	            continueInfo = true;
	            ifVar = true;
	            i = i + 3;
	        } else if (start === false && end === true) {
	            continueInfo = false;
	            ifVar = false;
	            i = i + 2;
	        } else if (continueInfo) {
	            arr[arrIndex].name += str[i];
	            i++;
	        } else if (!ifVar) {
	            ++arrIndex;
	            arr[arrIndex] = { ifVar: false, name: str[i] };
	            continueInfo = true;
	            i++;
	        }
	    }
	    return arr;
	    // let res = [];
	    // let args = VAR_INNERHTML.exec(str);
	    // while(args) {
	    //     res.push(args[1]);
	    //     args = VAR_INNERHTML.exec(str);
	    // }
	    // return res;

	}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utilityFunc = __webpack_require__(3);

	var _modelParse = __webpack_require__(7);

	var _baseWatcher = __webpack_require__(2);

	var _baseWatcher2 = _interopRequireDefault(_baseWatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextWatcher = function () {
	    function TextWatcher(base) {
	        _classCallCheck(this, TextWatcher);

	        this.base = base;
	        this.model = this.getModel();
	        this.viewList = []; //[{name:a,value:1},{name:>,value:>}]
	        this.viewShow = '';
	    }

	    _createClass(TextWatcher, [{
	        key: 'render',
	        value: function render() {
	            this.viewList = this.getViewList();
	            this.viewShow = this.getViewShow();
	            //非空节点或无变量
	            if (this.viewList.length !== 0) {
	                //渲染
	                this.base.domInformation.parentNode.innerHTML = this.viewShow;
	            }
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.render();
	        }
	    }, {
	        key: 'getModel',
	        value: function getModel() {
	            return (0, _modelParse.innerHTMLParse)(this.base.domInformation.textContent.trim());
	        }
	    }, {
	        key: 'getViewList',
	        value: function getViewList() {
	            var _this = this;

	            return this.model.map(function (item) {
	                return {
	                    name: item.name,
	                    //如果data里不存在这个变量就显示变量本身
	                    value: item.ifVar ? _this.base.execInstructions(item.name) : item.name
	                };
	            });
	        }
	    }, {
	        key: 'getViewShow',
	        value: function getViewShow() {
	            var view = '';
	            this.viewList.forEach(function (item) {
	                view += item.value;
	            });
	            return view;
	        }
	    }]);

	    return TextWatcher;
	}();

	exports.default = TextWatcher;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _baseWatcher = __webpack_require__(2);

	var _baseWatcher2 = _interopRequireDefault(_baseWatcher);

	var _utilityFunc = __webpack_require__(3);

	var _modelParse = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ComponentWatcher = function () {
	    function ComponentWatcher(base) {
	        _classCallCheck(this, ComponentWatcher);

	        this.base = base;
	        this.key = base.domInformation.dataset.from;
	        this.component = this.getComponent();
	        this.templete = this.getTemplete();
	        this.props = this.getProps();
	        this.refs = this.getRefs(this.templete);
	        this.data = this.getData();
	        this.model = this.getModel();
	        this.componentBaseWatcher;
	        ComponentWatcher.components[this.key].data = this.data;
	    }

	    _createClass(ComponentWatcher, [{
	        key: 'render',
	        value: function render() {
	            typeof this.component.willMount === 'function' && this.component.willMount.call(ComponentWatcher.components[this.key]);
	            this.renderComponent();
	            this.componentBaseWatcher = this.renderChildren()[0];
	            typeof this.component.didMount === 'function' && this.component.didMount.call(ComponentWatcher.components[this.key]);
	        }
	    }, {
	        key: 'reset',
	        value: function reset(changeData) {
	            console.log(changeData, 'changedata');
	            typeof this.component.willUpdate === 'function' && this.component.willMount.call(ComponentWatcher.components[this.key]);
	            this.componentBaseWatcher.setState(changeData);
	            typeof this.component.DidUpdate === 'function' && this.component.willMount.call(ComponentWatcher.components[this.key]);
	        }
	    }, {
	        key: 'getModel',
	        value: function getModel() {
	            var _this = this;

	            var model = [];
	            if (this.component.props) {
	                this.component.props.map(function (e) {
	                    var attr = _this.base.element.getAttribute(e);
	                    attr && (model = (0, _modelParse.modelParse)(attr));
	                });
	            }
	            return model;
	        }
	    }, {
	        key: 'execStateFunc',
	        value: function execStateFunc(func) {
	            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.component.data;

	            return new Function('data', 'with(data) {' + (func && func()) + ';}')(data);
	        }
	    }, {
	        key: 'getComponent',
	        value: function getComponent() {
	            return ComponentWatcher.components[this.key];
	        }
	    }, {
	        key: 'getTemplete',
	        value: function getTemplete() {
	            var div = document.createElement('div');
	            div.innerHTML = this.component.templete();
	            return (0, _utilityFunc.toArray)(div.childNodes);
	        }
	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var _this2 = this;

	            var props = {};
	            if (this.component.props) {
	                this.component.props.map(function (e) {
	                    var attr = _this2.base.element.getAttribute(e);
	                    if (attr) {
	                        var model = (0, _modelParse.modelParse)(attr)[0];
	                        props[e] = _this2.base.parent.nowData[model];
	                    }
	                });
	            }
	            return props;
	        }
	    }, {
	        key: 'getRefs',
	        value: function getRefs(DOMArr) {
	            var _this3 = this;

	            DOMArr.map(function (e) {
	                e.nodeType === 1 && e.getAttribute('ref') && (ComponentWatcher.components[_this3.key]['refs'][e.getAttribute('ref')] = e);
	                e.childNodes && _this3.getRefs((0, _utilityFunc.toArray)(e.childNodes));
	            });
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            var props = this.props;
	            var componentData = this.component.data;
	            return Object.assign(componentData, props);
	        }
	    }, {
	        key: 'renderComponent',
	        value: function renderComponent() {
	            var frg = document.createDocumentFragment();
	            this.templete.map(function (item) {
	                frg.appendChild(item);
	            });
	            this.base.domInformation.parentNode.removeChild(this.base.element);
	            this.base.domInformation.parentNode.insertBefore(frg, this.base.domInformation.nextSibling);
	        }
	    }, {
	        key: 'renderChildren',
	        value: function renderChildren() {
	            var _this4 = this;

	            var previousWatcher = null;
	            return this.templete.map(function (item, index) {
	                var childWatcher = new _baseWatcher2.default(item, _this4.data, previousWatcher, _this4.component.id, _this4.base.getNowId(index), _this4.key, _this4.base);
	                previousWatcher = childWatcher;
	                return childWatcher;
	            });
	        }
	    }]);

	    return ComponentWatcher;
	}();

	ComponentWatcher.components = {};
	exports.default = ComponentWatcher;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _componentWatcher = __webpack_require__(9);

	var _componentWatcher2 = _interopRequireDefault(_componentWatcher);

	var _checkComponent = __webpack_require__(11);

	var _checkComponent2 = _interopRequireDefault(_checkComponent);

	var _utilityFunc = __webpack_require__(3);

	var _model = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterComponent = function () {
	    function RegisterComponent(key, component) {
	        _classCallCheck(this, RegisterComponent);

	        (0, _checkComponent2.default)(key);
	        this.id = (0, _utilityFunc.random)();
	        component.id = this.id;
	        component.refs = {};
	        this.key = key;
	        this.keyList = [];
	        this.resetList = [];
	        this.timer = null;
	        _componentWatcher2.default.components[key] = component;
	    }
	    // updateRender(changeData) {
	    //     let resetList = []
	    //     let watcherArr = [];
	    //     for(let key in changeData) {
	    //         if(changeData[key] !== ComponentWatcher.components[this.key].data[key]){
	    //             ComponentWatcher.components[this.key].data[key] = changeData[key]
	    //             watcherArr = get(this.id, key);
	    //             resetList = watcherArr ? resetList.concat(get(this.id, key)) : resetList;
	    //         }
	    //     }
	    //     return this.resetList.concat(resetList);
	    // }


	    _createClass(RegisterComponent, [{
	        key: 'getKeyList',
	        value: function getKeyList(changeData) {
	            var keyList = void 0;
	            for (var key in changeData) {
	                if (changeData[key] !== _componentWatcher2.default.components[this.key].data[key]) {
	                    _componentWatcher2.default.components[this.key].data[key] = changeData[key];
	                    this.keyList.push(key);
	                }
	            }
	            return this.keyList.concat(keyList);
	        }
	    }, {
	        key: 'getRestList',
	        value: function getRestList(keyList) {
	            var _this = this;

	            var watcherArr = [];
	            var resetList = [];
	            keyList.length && keyList.forEach(function (key) {
	                watcherArr = (0, _model.get)(_this.id, key);
	                resetList = watcherArr ? resetList.concat({ watcherArr: (0, _model.get)(_this.id, key), key: key }) : resetList;
	            });
	            return resetList;
	        }
	    }, {
	        key: 'setState',
	        value: function setState(changeData) {
	            var _this2 = this;

	            this.keyList = this.getKeyList(changeData);
	            clearTimeout(this.timer);
	            this.timer = setTimeout(function () {
	                _this2.resetList = _this2.getRestList(_this2.keyList);
	                console.log('bbbbb', _this2.resetList);
	                if (_this2.resetList.length !== 0) {
	                    _this2.resetList.forEach(function (item) {
	                        item.watcherArr.forEach(function (watcher) {
	                            //console.log(item.key)
	                            watcher.reset(_defineProperty({}, item.key, _componentWatcher2.default.components[_this2.key].data[item.key]));
	                        });
	                    });
	                    _this2.keyList = [];
	                }
	            }, 0);
	        }
	    }]);

	    return RegisterComponent;
	}();

	exports.default = RegisterComponent;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = checkComponent;

	var _componentWatcher = __webpack_require__(9);

	var _componentWatcher2 = _interopRequireDefault(_componentWatcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function checkComponent(key) {
	    if (_componentWatcher2.default.components[key]) throw new SyntaxError('component ' + key + ' already exists');
	}

/***/ })
/******/ ]);