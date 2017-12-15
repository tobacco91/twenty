let abc = {
    a:11,
    b:45678
}
let value;
Object.defineProperty(abc,'b',{
    get: function() {
        return value;
    },
    set: function(now) {
     	value = now;
    }

})

abc.b = [1,2];
abc.b.push(4)
console.log(abc,abc.b)