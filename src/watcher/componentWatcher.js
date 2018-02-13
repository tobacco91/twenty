import BaseWatcher from './baseWatcher.js'
import { toArray } from '../utilityFunc/utilityFunc.js'
export default class ComponentWatcher {
    static components = {}
    constructor(base) {
        this.base = base;
        this.key = base.domInformation.dataset.from;
        this.component = this.getComponent();
        this.templete = this.getTemplete();
        this.props = this.getProps();
        console.log(this.props)
        this.refs = this.getRefs();
        this.data = this.getData();
        console.log(this.data)
    }
    render() {
        typeof this.component.willMount === 'function' && this.component.willMount.call(ComponentWatcher.components[this.key]);
        this.renderComponent();
        this.renderChildren();
        typeof this.component.didMount === 'function' && this.component.didMount.call(ComponentWatcher.components[this.key]);
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
    getProps() {
        let props = {}
        this.component.props.map(e => {
            this.base.element.getAttribute(e) && (props[e] = this.base.element.getAttribute(e));
        })
        return props;
    }
    getRefs() {
        this.templete.map(e => {
            e.nodeType === 1 
            && e.getAttribute('ref')
            && (ComponentWatcher.components[this.key]['refs'][e.getAttribute('ref')] = e)
            
        })
    }
    getData() {
        let props = this.props;
        let componentData = this.component.data;
        return Object.assign(componentData,props)
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
                this.data,
                previousWatcher,
                this.component.key,
                this.base.getNowId(index)
            )
            previousWatcher = childWatcher;
        })
    }
    
}