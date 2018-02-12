import BaseWatcher from '../watcher/baseWatcher.js';
import registerComponent from '../component/registerComponent.js';
import { random } from '../utilityFunc/utilityFunc.js';
export default {
    watch(element, data) {
        return new BaseWatcher(
            element,
            data,
            null,
            random(),
            0,
            null,
            null
        )
    },
    registerComponent(key, component) {
        return registerComponent(key, component)
    }
}