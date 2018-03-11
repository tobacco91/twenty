import ComponentWatcher from '../watcher/componentWatcher.js'
import checkComponent from './checkComponent.js';
import { random } from '../utilityFunc/utilityFunc.js'
import { set,get } from '../model/model.js'
// export default function registerComponent(key, component) {
//     checkComponent(key);
//     component.id = random();
//     component.refs = {};
//     ComponentWatcher.components[key] = component;
//     //console.log(ComponentWatcher.components)
// }
export default class RegisterComponent {
    constructor(key, component) {
        checkComponent(key);
        component.id = random();
        component.refs = {};
        this.component = component;
        this.resetList = [];
        ComponentWatcher.components[key] = component;
    }
    updateRender(changeData) {
        let resetList = []
        let watcherArr = [];
        for(let key in changeData) {
            if(changeData[key] !== this.component.data[key]){
                //console.log()
                this.component.data[key] = changeData[key]
                watcherArr = get(this.component.id, key);
                resetList = watcherArr ? resetList.concat(get(this.component.id, key)) : resetList;
            }
        }
        return resetList;
    }

    setState(changeData) {
        this.resetList = this.updateRender(changeData)
        //console.log(this.resetList)
        if(this.resetList.length !== 0) {
            this.resetList.forEach(item => {
                item.reset();
            })
        }
    }
}