global.Twenty = require('./observer/bind.js').default;
//console.log(Twenty)
Twenty.registerComponent('red',{
    props: ['abc','qwe','a'],
    templete: `<div ref="div">{{a}}</div>`,
    data: {
        a: 'red var a'
    },
    didMount: function() {
        console.log(this.data.a,this.refs.div)
    }
})