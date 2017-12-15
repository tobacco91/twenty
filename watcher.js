export default class Watcher {
    constructor(window,obj) {
        window = obj;
        this.obj = obj;
    }
    observe(obj, key, callback) {
        let old = obj[key];
        if( old.toString() === '[object Object]') {
            observeAll(old)
        }
        Object.defineProperty(obj, key, {
            enumerable: true,//可枚举
            configurable: true,//可改变
            get: () => old,
            set: now => {
                if(now !== old) {
                    callback(old,now)
                }
                old = now
            }
        })
    }
    observeAll(obj) {
        Object.keys(obj).forEach((ele) => {
            observe(obj, ele, callback)
        })
    }
}