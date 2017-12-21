import BaseWatcher from '../watcher/baseWatcher.js';
const model = {};
export function set(modelId, key, watcher) {
    if(!model[modelId]) {
        model[modelId] = {};
    }
    if(!(watcher instanceof BaseWatcher)) {
        throw new TypeError('watcher type must be basewatcher')
    }
    if(model[modelId][key]) {
        model[modelId][key].push(watcher)
    } else {
        model[modelId][key] = [watcher]
    }
}