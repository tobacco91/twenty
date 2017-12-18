import { toArray } from '../utilityFunc/untilityFunc.js'
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
	constructor(element, nowData, modelId, nowId = 0, styleDisplay = 'block') {
		this.element = element;
		this.nowData = nowData;
		this.modelId = modelId;
		this.nowId = nowId;
		this.styleDisplay = styleDisplay;
		this.nowWatcher = this.getWatcher();
		this.nowType = this.getType();
		this.domInformation = this.getDomInformation();
	}
	getDomInformation() {
		return {
			dataset : this.element.dataset
		}
	}
	setModel() {
		
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
		return (new Function('data', `with(data) { return ${statement};}`))(data);
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
