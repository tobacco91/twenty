import { toArray } from '../utilityFunc/untilityFunc.js'
import innerHTMLParse from '../model/modelParse.js';
import BaseWatcher from './baseWatcher.js';
export default class TextWatcher {
    constructor(base) {
        this.viewList = getViewList();
    }
    render() {
        if(this.viewList.value) {
            //渲染
        }
    }
    getViewList() {
        let innerVar = innerHTMLParse(this.base.element) || [];
        return innerVar.map(item => {
            return {
                name: item,
                //如果data里不存在这个变量就显示变量本身
                value: this.base.execInstructions(item)
            }
        })
    }
}