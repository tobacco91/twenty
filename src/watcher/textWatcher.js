import { toArray } from '../utilityFunc/utilityFunc.js'
import { innerHTMLParse } from '../parse/modelParse.js';
import BaseWatcher from './baseWatcher.js';
export default class TextWatcher {
    constructor(base) {
        this.base = base;
        this.viewList = this.getViewList();
    }
    render() {
        //非空节点或无变量
        if(this.viewList.value) {
            //渲染
            this.base.element.parentNode.innerHTML = this.viewList.value;
        }
    }
    getViewList() {
        //console.log(this.base,1)
        let innerVar = innerHTMLParse(this.base.element) || [];
        return innerVar.map((item) => {
            return {
                name: item,
                //如果data里不存在这个变量就显示变量本身
                value: this.base.execInstructions(item)
            }
        })
    }
}