import { toArray } from '../utilityFunc/utilityFunc.js'
import { set } from '../model/model.js'
import ElementWatcher from './elementWatcher.js';
import ManageWatcher from './manageWatcher.js';
import TextWatcher from './textWatcher.js';
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
        this.domInformation = this.getDomInformation();
	    this.nowType = this.getType();
		this.nowWatcher = this.getWatcher();
		this.setModel();
		this.render();
	}
	render() {
		this.nowWatcher.render();
	}
	getDomInformation() {
		return {
			dataset : this.element.dataset,
			attr : this.element.attributes ? toArray(this.element.attributes) : [],
            textContent: this.element.textContent
		}
	}
	setModel() {
        
		let model = this.nowWatcher.model;
		if(model) {
			model.forEach((item) => {
				set(this.modelId, item, this)
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
		}
        //  else if(NODE_NAME === Component.nodeName) {
		// 	return BaseWatcher.ComponentWatcherType;
		// }
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
			case BaseWatcher.ManagerWatcherType: 
				watcher = ManageWatcher;
				break;
           default: 
           //console.log(this.element,this.nowType)
                throw new TypeError('type Type errors,can only be Element/text/Manager/component')
		}
		return new watcher(this)
	}

}
