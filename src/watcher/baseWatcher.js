import { toArray } from '../utilityFunc/utilityFunc.js'
import { set,get } from '../model/model.js'
import ElementWatcher from './elementWatcher.js';
import TextWatcher from './textWatcher.js';
import ComponentWatcher from './componentWatcher.js';
export default class BaseWatcher {
    static ManagerWatcherType = 1;
    static ElementWatcherType = 2;
    static TextWatcherType = 3;
    static ComponentWatcherType = 4;
	static ComponentName = 'component';
	static ManagerSign = 'each';
	//元素 数据 上一个元素watcher 本组件的随机数 本元素的排序数 所属组件 父元素Watcher
	constructor(element, nowData, previous = null, modelId, nowId = 0, component = null, parent = null) {
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
	render() {
		this.nowWatcher.render();
	}
    reset(changeData = '') {
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
    getKeyList(changeData) {
        let keyList = [];
        for(let key in changeData) {
            if(changeData[key] !== this.nowData[key]){
                this.nowData[key] = changeData[key]
                keyList.push(key)
            }
        }
        return this.keyList.concat(keyList);
    }
    getRestList(keyList) {
        let watcherArr = [];
        let resetList = [];
        keyList.length && keyList.forEach(key => {
            watcherArr = get(this.modelId, key);
            resetList = watcherArr ? resetList.concat(get(this.modelId, key)) : resetList;
        })
        return resetList;
    }
    setProps(changeData) {
        this.keyList = this.getKeyList(changeData)
        console.log(changeData)
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.resetList = this.getRestList(this.keyList)
            console.log('aaaaa',this.resetList)
            if(this.resetList.length !== 0) {
                this.resetList.forEach(item => {
                    item.reset();
                })
                this.keyList = [];
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
	getDomInformation() {
		return {
			dataset : this.element.dataset,
			attr : this.element.attributes ? toArray(this.element.attributes) : [],
            textContent: this.element.textContent,
            parentNode: this.element.parentNode,
            nextSibling: this.element.nextSibling
		}
	}
	setModel() {
        let model = this.nowWatcher.model;
		if(model && model.length !== 0) {
			model.forEach((item) => {
				set(this.modelId, item.name ? item.name : item, this)
			});
		}
		
	}
	removeAttr(name) {
		this.element.removeAttribute(name)
	}
	setAttr(name,value) {
		this.element.setAttribute(name,value)
	}
	getNowId(i) {
		return `${this.nowId}.${i}`
	}
	getType() {
		const NODE_TYPE = this.element.nodeType;
		const NODE_NAME = this.element.nodeName.toLowerCase();
		if(this.element.nodeType === 3) {
			return BaseWatcher.TextWatcherType;
		}else if(NODE_NAME === BaseWatcher.ComponentName) {
			return BaseWatcher.ComponentWatcherType;
		}
        else if(this.domInformation.dataset.hasOwnProperty(BaseWatcher.ManagerSign)) {
			return BaseWatcher.ManagerWatcherType;
		} else {
			return BaseWatcher.ElementWatcherType;
		}
	}
	execInstructions(statement,data = this.nowData) {
		//return this.nowData[statement];
        return (new Function('data', `with(data) { return ${statement};}`))(data);
	}
	filterAttr(list = [], type = true) {
		return this.domInformation.attr.filter((item) => {
			return type ? list.indexOf(item.name) > -1 : list.indexOf(item.name) === -1;
		})
		
	}
	getWatcher() {
		let watcher = null;
		switch(this.nowType) {
			case BaseWatcher.ElementWatcherType: 
				watcher = ElementWatcher;
				break;
			case BaseWatcher.TextWatcherType: 
				watcher = TextWatcher;
				break;
            case BaseWatcher.ComponentWatcherType: 
				watcher = ComponentWatcher;
				break;
           default: 
           //console.log(this.element,this.nowType)
                throw new TypeError('type Type errors,can only be Element/text/Manager/component')
		}
		return new watcher(this)
	}

}
