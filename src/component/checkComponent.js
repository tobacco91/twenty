import ComponentWatcher from '../watcher/componentWatcher.js'
export default function checkComponent(key) {
    if(ComponentWatcher.components[key])
        throw new SyntaxError(`component ${key} already exists`);
}