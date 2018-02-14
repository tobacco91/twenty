global.Twenty = require('./observer/bind.js').default;

Twenty.registerComponent('red',{
    props: ['abc','qwe','a'],
    templete: `<div ref="div">
            <h2 ref="h2">我也很绝望啊</h2>
            <p>{{a}}</p>
        </div>`,
    data: {
        a: 'red var a'
    },
    didMount: function() {
        console.log(this.data.a,this.refs.h2)
    }
})
// Twenty.registerComponent('red',{
//     props: ['abc','qwe','a'],
//     templete: `<div ref="div">
//             <h2 ref="h2">我也很绝望啊</h2>
//         </div>`,
//     data: {
//         a: 'red var a'
//     },
//     didMount: function() {
//         console.log(this.data.a,this.refs.h2)
//     }
// })