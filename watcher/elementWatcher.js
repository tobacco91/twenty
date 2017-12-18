import { toArray } from '../utilityFunc/untilityFunc.js'
export default class ElementWatcher {
    static instructions = {
        if: this.handleIf,
        else: this.handleElse,
        ifElse: this.handleIfElse
    }
    //['if', 'else', 'elseIf'];
    constructor(base) {
        this.base = base;
        this.styleDisplay = '';
        this.nextRenderInfo = true;
        this.resolvedInstructions = {}
    }
    render() {
        let execResolved;
        for(let i  in ElementWatcher.instructions) {
            if(this.base.domInformation.dataset.hasOwnProperty(i)) {
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