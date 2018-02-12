import BaseWatcher from './baseWatcher.js'
import { toArray } from '../utilityFunc/utilityFunc.js'
export default class ComponentWatcher {
    static components = {}
    constructor(base) {
        this.base = base;
        this.key = base.domInformation.dataset.from;
        this.component = this.getComponent();
        this.templete = this.getTemplete();
    }
    render() {
        this.renderComponent();
        this.renderChildren();
        console.log(typeof this.component.didMount === 'function')
        if(this.component.didlMount) {
            console.log(124)
            this.component.didMount()
        }
        //typeof this.component.didlMount === 'function' && this.component.didMount();
    }
    execStateFunc(func, data = this.component.data) {
        return (new Function('data', `with(data) {${func && func()};}`))(data);
	}
    getComponent() {
        return ComponentWatcher.components[this.key];
    }
    getTemplete() {
        let div = document.createElement('div');
        div.innerHTML = this.component.templete;
        return toArray(div.childNodes);
    }
    renderComponent() {
        let frg = document.createDocumentFragment();
        this.templete.map(item => {
            frg.appendChild(item);
        })
        this.base.domInformation.parentNode.removeChild(this.base.element);
        this.base.domInformation.parentNode.insertBefore(frg,this.base.domInformation.nextSibling)
    }
    renderChildren() {
        let previousWatcher = null;
        this.templete.map((item, index) => {
            const childWatcher = new BaseWatcher(
                item,
                this.component.data,
                previousWatcher,
                this.component.key,
                this.base.getNowId(index)
            )
            previousWatcher = childWatcher;
        })
    }
}