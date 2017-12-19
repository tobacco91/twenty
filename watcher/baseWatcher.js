import { toArray } from '../utilityFunc/untilityFunc.js'
import { set } from '../model/model.js'
import ElementWatcher from './elementWatcher.js';
import ManageWatcher from './manageWatcher.js';
import TextWatcher from './textWatcher.js';
export class BaseWatcher {
    static ManagerWatcher = 1;
    static ElementWatcher = 2;
    static TextWatcher = 3;
    static ComponentWatcher = 4;
	static ComponentName = 'component';
	static ManagerSign = 'each';
	//元素 数据 上一个元素watcher 本组件的随机数 本元素的排序数 所属组件 父元素Watcher
	constructor(element, nowData, previous = null, modelId, nowId = 0, component = null, parent = null) {
		this.element = element;
		this.nowData = nowData;
		this.previous = previous;
		this.modelId = modelId;
		this.nowId = nowId;
		//this.styleDisplay = styleDisplay;
		this.nowWatcher = this.getWatcher();
		this.nowType = this.getType();
		this.domInformation = this.getDomInformation();
		this.setModel();
		this.render();
	}
	render() {
		this.nowWatcher.render();
	}
	getDomInformation() {
		return {
			dataset : this.element.dataset,
			attr : this.element.attributes ? toArray(this.element.attributes) : []
		}
	}
	setModel() {
		const model = this.nowWatcher.model;
		if(model) {
			model.forEach(function(item) {
				set(modelId, item, this)
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
		const NODE_NAME = this.element.nodeName.toLowCase();
		if(this.element.nodeType === 3) {
			return BaseWatcher.TextWatcher;
		} else if(NODE_NAME === Component.nodeName) {
			return BaseWatcher.ComponentWatcher;
		}else if(this.domInformation.dataset.hasOwnProperty(BaseWatcher.ManagerSign)) {
			return BaseWatcher.ManagerWatcher;
		} else {
			return BaseWatcher.ElementWatcher;
		}
	}
	execInstructions(statement,data = this.nowData) {
		return this.nowData[statement];
		//(new Function('data', `with(data) { return ${statement};}`))(data);
	}
	filterAttr(list = [], type = true) {
		this.domInformation.attr.filter((item) => {
			return type ? list.indexOf(item.name) > -1 : list.indexOf(item.name) === -1;
		})
		
	}
	getWatcher() {
		let watcher = null;
		switch(this.nowType) {
			case BaseWatcher.ElementWatcher: 
				watcher = ElementWatcher;
				break;
			case BaseWatcher.TextWatcher: 
				watcher = TextWatcher;
				break;
			case BaseWatcher.ManagerWatcher: 
				watcher = ManageWatcher;
				break;
		}
		new watcher(this)
	}

}
