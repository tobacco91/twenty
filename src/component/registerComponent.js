import ComponentWatcher from '../watcher/componentWatcher.js'
import { random } from '../utilityFunc/utilityFunc.js'
export default function registerComponent(key, component) {
    //checkComponent(key);
    component.id = random();
    ComponentWatcher.components[key] = component;
}