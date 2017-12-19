import { toArray } from '../utilityFunc/untilityFunc.js'
import modelParse from '../model/modelParse.js';
import BaseWatcher from './baseWatcher.js'
export default class ElementWatcher {
    static instructionsHandle = {
        'data-if': this.handleIf,
        'data-else': this.handleElse,
        'data-if-else': this.handleIfElse
    }
    static instructions = ['data-if','data-else','data-if-else'];
    constructor(base) {
        this.base = base;
        this.renderInf = null;
        this.nextRenderInfo = true;
        this.instructionsList = this.getDataset();
        this.model = this.getModel();
    }
    render() {
        let instructionslist;
        this[ElementWatcher.instructionsHandle[this.instructionsList.name]](this.instructionsList.resolve);
        this.childWatcher();
    }
    childWatcher() {
        toArray(this.base.element.childNodes).forEach(function(element) {
            new BaseWatcher(element,)
        });
    }
    getDataset() {
        return this.base.filterAttr(ElementWatcher.instructions, true)
                .map((item) => {
                    this.base.removeAttr(item.name);
                    return {name: item.name, value: item.value, resolve: this.base.execInstructions(item.value)}
                 })[0]
    }
    setNowId() {
        this.base.setAttr('data-now-id', this.base.nowId)
    }
    getModel() {
        this.instructionsList.forEach((item) => {
            modelParse(item.value);
        })
    }
    handleIf(value) {
        if(!value) {
            this.shouldRender = false;
        }
    }
    handleElse(value) {
        this.base.previous
    }

}