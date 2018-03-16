import ComponentWatcher from '../watcher/componentWatcher.js'
import checkComponent from './checkComponent.js';
import { random } from '../utilityFunc/utilityFunc.js'
import { set,get,model } from '../model/model.js'

export default class RegisterComponent {
    constructor(key, component) {
        checkComponent(key);
        this.id = random()
        component.id = this.id;
        component.refs = {};
        this.key = key;
        this.keyList = [];
        this.resetList = [];
        this.timer = null;
        ComponentWatcher.components[key] = component;
    }
    // updateRender(changeData) {
    //     let resetList = []
    //     let watcherArr = [];
    //     for(let key in changeData) {
    //         if(changeData[key] !== ComponentWatcher.components[this.key].data[key]){
    //             ComponentWatcher.components[this.key].data[key] = changeData[key]
    //             watcherArr = get(this.id, key);
    //             resetList = watcherArr ? resetList.concat(get(this.id, key)) : resetList;
    //         }
    //     }
    //     return this.resetList.concat(resetList);
    // }
    getKeyList(changeData) {
        let keyList;
        for(let key in changeData) {
            if(changeData[key] !== ComponentWatcher.components[this.key].data[key]){
                ComponentWatcher.components[this.key].data[key] = changeData[key]
                this.keyList.push(key)
            }
        }
        return this.keyList.concat(keyList);
    }
    getRestList(keyList) {
        let watcherArr = [];
        let resetList = [];
        keyList.length && keyList.forEach(key => {
            watcherArr = get(this.id, key);
            resetList = watcherArr ? resetList.concat({watcherArr: get(this.id, key),key: key}) : resetList;
        })
        return resetList;
    }
    setState(changeData) {
        this.keyList = this.getKeyList(changeData)
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.resetList = this.getRestList(this.keyList)
            console.log('bbbbb',this.resetList)
            if(this.resetList.length !== 0) {
                this.resetList.forEach(item => {
                    item.watcherArr.forEach(watcher => {
                        //console.log(item.key)
                        watcher.reset({[item.key]: ComponentWatcher.components[this.key].data[item.key]});
                    })
                    
                })
                this.keyList = [];
            }
        }, 0);
    }
}