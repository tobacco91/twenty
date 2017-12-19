import { toArray } from '../utilityFunc/untilityFunc.js'
import modelParse from '../model/modelParse.js';
export default class ElementWatcher {
    static instructionsHandle = {
        'data-if': this.handleIf,
        'data-else': this.handleElse,
        'data-if-else': this.handleIfElse
    }
    static instructions = ['data-if','data-else','data-if-else'];
    constructor(base) {
        this.base = base;
        this.styleDisplay = '';
        this.nextRenderInfo = true;
        this.instructionsList = this.getDataset();
        this.resolvedInstructions = {};
        this.model = this.getModel();
    }
    render() {
        let execResolved;
        for(let i  in ElementWatcher.instructions) {
            if(this.base.domInformation.dataset.hasOwnProperty(i)) {
                this.model = modelParse(this.base.domInformation.dataset[i]);
                execResolved = this.base.execInstructions(this.base.domInformation.dataset[i]);
                this.resolvedInstructions[i] = execResolved;
                ElementWatcher.instructions[i](execResolved);
            }
        } 
        this.childWatcher();
    }
    childWatcher() {
        toArray(this.base.element.childNodes).forEach(function(element) {
            new BaseWatcher(element,)
        });
    }
    getDataset() {
        return this.base.filterAttr(this.instructionsList, true)
                .map((item) => {
                    this.base.removeAttr(item.name);
                    return {name: item.name, value: item.value}
                 })
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
        if(value) {
            this.nextRenderInfo = false;
        }
        if(!value) {
            this.base.element.style.display = 'none';
        }
        delete this.base.element.dataset.value;
    }

}