import BaseWatcher from '../watcher/baseWatcher.js';
const model = {};
console.log(model)
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

export function get(modelId, key) {
    return model[modelId] && model[modelId][key];
}