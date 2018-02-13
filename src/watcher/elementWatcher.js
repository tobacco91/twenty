import { EVENT_TYPE,pushEventPool } from '../event/event.js';
import { toArray } from '../utilityFunc/utilityFunc.js'
import { modelParse } from '../parse/modelParse.js';
import BaseWatcher from './baseWatcher.js'
export default class ElementWatcher {
    static instructionsHandle = {
        'data-if': 'handleIf',
        'data-else': 'handleElse',
        'data-if-else': 'handleIfElse'
    }
    static instructions = ['data-if','data-else','data-if-else'];
    constructor(base) {
        this.base = base;
        //console.log(this.base.element)
        // this.nextRenderInfo = true;
        this.instructionsList = this.getDataset();//{name:data-if,value:a>b,reslove:false}
        this.model = this.getModel();//获取 a>b 中的a b
        this.renderInf = null; //是否渲染
        this.childWatcherList = [];
        this.events = null;//{type :click,func:mesg(e)}
        this.setNowId();
    }
    render() {
        this.renderInf = this.getRenderInfo();
        this.events = this.getEvents();
        if(this.renderInf.renderInstructions) {
            this[ElementWatcher.instructionsHandle[this.instructionsList.name]](this.instructionsList.resolve);
            if(!this.renderInf.renderShould) {
                this.base.element.style.display = 'none';
            } else {
                this.bindEvents();
                this.childWatcher();
            }
        } else {
            if(this.base.element.nodeName == 'H2') {
                console.log(this.renderInf.renderInstructions)
                console.log(this.base.element)
                console.log(this.childWatcherList)
            }
            this.bindEvents();
            this.childWatcher();
        }
        
    }
    reset() {
        this.instructionsList && (this.instructionsList.resolve = this.base.execInstructions(this.instructionsList.value));
        this.render();
    }
    childWatcher() {
        let previousWatcher = null;
        // console.log(this.BaseWatcher)
        this.childWatcherList = toArray(this.base.element.childNodes).map((element,index) => {
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
        return this.base.filterAttr(ElementWatcher.instructions)
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
        if(this.instructionsList) {
            return modelParse(this.instructionsList.value);
        } 
    }
    getEvents() {
        return this.base.filterAttr(EVENT_TYPE)
        .map(item => {
           this.base.removeAttr(item.name)
           return {type: item.name, func: modelParse(item.value)[0]}
        })
    }
    bindEvents() {
        this.events.forEach((item) => {
            //console.log(this.base.execInstructions(item.func))
            pushEventPool(this.base.element, item.type, this.base.execInstructions(item.func))
        });
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
        if(previousWatcher && previousWatcher.nowWatcher.instructionsList.resolve) {
            this.renderInf.renderShould = false;
        }
    }

}