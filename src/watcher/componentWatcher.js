import BaseWatcher from './baseWatcher.js'
import { toArray } from '../utilityFunc/utilityFunc.js'
import { modelParse } from '../parse/modelParse.js';
export default class ComponentWatcher {
    static components = {}
    constructor(base) {
        this.base = base;
        this.key = base.domInformation.dataset.from;
        this.component = this.getComponent();
        this.templete = this.getTemplete();
        this.props = this.getProps();
        this.refs = this.getRefs(this.templete);
        this.data = this.getData();
        this.model = this.getModel();
        this.componentBaseWatcher;
        ComponentWatcher.components[this.key].data = this.data;
    }
    render() {
        typeof this.component.willMount === 'function' && this.component.willMount.call(ComponentWatcher.components[this.key]);
        this.renderComponent();
        this.componentBaseWatcher = this.renderChildren()[0];
        typeof this.component.didMount === 'function' && this.component.didMount.call(ComponentWatcher.components[this.key]);
    }
    reset(changeData) {
        console.log(changeData,'changedata')
        typeof this.component.willUpdate === 'function' && this.component.willMount.call(ComponentWatcher.components[this.key]);
        this.componentBaseWatcher.setState(changeData)
        typeof this.component.DidUpdate === 'function' && this.component.willMount.call(ComponentWatcher.components[this.key]);
    }
    getModel() {
        let model = [];
        if(this.component.props) {
            this.component.props.map(e => {
                let attr = this.base.element.getAttribute(e);
                attr && (model = modelParse(attr));
            })
        }
        return model;
    }
    execStateFunc(func, data = this.component.data) {
        return (new Function('data', `with(data) {${func && func()};}`))(data);
	}
    getComponent() {
        return ComponentWatcher.components[this.key];
    }
    getTemplete() {
        let div = document.createElement('div');
        div.innerHTML = this.component.templete();
        return toArray(div.childNodes);
    }
    getProps() {
        let props = {}
        if(this.component.props) {
            this.component.props.map(e => {
                let attr = this.base.element.getAttribute(e)
                if(attr) {
                    let model = modelParse(attr)[0]
                    props[e] = this.base.parent.nowData[model];
                }
                
            })
        }
        return props;
    }
    getRefs(DOMArr) {
        DOMArr.map(e => {
            e.nodeType === 1 
            && e.getAttribute('ref')
            && (ComponentWatcher.components[this.key]['refs'][e.getAttribute('ref')] = e);
            e.childNodes && this.getRefs(toArray(e.childNodes));
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
        return this.templete.map((item, index) => {
            const childWatcher = new BaseWatcher(
                item,
                this.data,
                previousWatcher,
                this.component.id,
                this.base.getNowId(index),
                this.key,
                this.base
            )
            previousWatcher = childWatcher;
            return childWatcher;
        })
        
    }
    
}