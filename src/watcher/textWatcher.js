import { toArray } from '../utilityFunc/utilityFunc.js'
import { innerHTMLParse } from '../parse/modelParse.js';
import BaseWatcher from './baseWatcher.js';
export default class TextWatcher {
    constructor(base) {
        this.base = base;
        this.model = this.getModel();
        this.viewList = [];//[{name:a,value:1},{name:>,value:>}]
        this.viewShow = '';
    }
    render() {
        this.viewList = this.getViewList();
        this.viewShow = this.getViewShow();
        //非空节点或无变量
        if(this.viewList.length !== 0) {
            //渲染
            this.base.domInformation.parentNode.innerHTML = this.viewShow;
        }
    }
    reset() {
        this.render();
    }
    getModel() {
        return innerHTMLParse(this.base.domInformation.textContent.trim());
    }
    getViewList() {
        return this.model.map((item) => {
            return {
                name: item.name,
                //如果data里不存在这个变量就显示变量本身
                value: item.ifVar ? this.base.execInstructions(item.name) : item.name
            }
        })
    }
    getViewShow() {
        let view = '';
        this.viewList.forEach((item) => {
            view += item.value;
        })
        return view;
    }
}