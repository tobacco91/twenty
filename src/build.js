global.Twenty = require('./observer/bind.js').default;
//console.log(Twenty)
Twenty.registerComponent('red',{
    templete: `<div>redred</div>`,
    data: {
        a: 'red var a'
    },
    didMount: function() {
        console.log(this.data.a)
    }
})