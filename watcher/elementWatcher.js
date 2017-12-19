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
        this.nextRenderInfo = true;
        this.instructionsList = this.getDataset();//{name:data-if,value:a>b,reslove:false}
        this.model = this.getModel();//获取 a>b 中的a b
        this.renderInf = this.getRenderInfo(); //是否渲染
        childWatcherList = [];
        this.setNowId();
    }
    render() {
        if(this.renderInf.renderInstructions) {
            this[ElementWatcher.instructionsHandle[this.instructionsList.name]](this.instructionsList.resolve);
            if(!this.renderInf.renderShould) {
                this.base.element.style.display = 'none';
            } else {
                this.childWatcher();
            }
        } else {
            this.childWatcher();
        }
        
    }
    childWatcher() {
        let previousWatcher = null;
        this.childWatcherList = toArray(this.base.element.childNodes).map(function(element,index) {
            const childWatcher = new BaseWatcher(
            element
            ,this.base.nowData
            ,previousWatcher
            ,this.base.modelId
            ,this.base.getNowId(index))
            previousWatcher = childWatcher;
            return childWatcher;
        });
    }
    getDataset() {
        return this.base.filterAttr(ElementWatcher.instructions, true)
                .map((item) => {
                    this.base.removeAttr(item.name);
                    return {name: item.name, value: item.value, resolve: this.base.execInstructions(item.value)}
                 })[0]
    }
    getRenderInfo() {
        let renderInstructions = true;
        if(this.instructionsList === undefined) {
            renderInstructions = false
        }
        return {
            renderInstructions : renderInstructions,
            renderShould: true
        }
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
            this.renderInf.renderShould = false;
        }
    }
    handleElse(value) {
        let previousWatcher = this.base.previous;
        while(previousWatcher) {
            if(previousWatcher.nowType === BaseWatcher.ElementWatcher) {
                if(previousWatcher.domInformation.dataset.hasOwnProperty('if')) {
                    break;
                }else if(previousWatcher.domInformation.dataset.hasOwnProperty('elseIf') && previousWatcher.nowWatcher.instructionsList.resolve) {
                    break
                }
            }
            previousWatcher = previousWatcher.previous;
        }
        //如果之前有ELSEif或者if为true 则这个else节点不渲染
        if(previousWatcher.nowWatcher.instructionsList.resolve) {
            this.renderInf.renderShould = false;
        }
    }

}