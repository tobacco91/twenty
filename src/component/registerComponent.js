import ComponentWatcher from '../watcher/componentWatcher.js'
import checkComponent from './checkComponent.js';
import { random } from '../utilityFunc/utilityFunc.js'
export default function registerComponent(key, component) {
    checkComponent(key);
    component.id = random();
    component.refs = {};
    ComponentWatcher.components[key] = component;
}