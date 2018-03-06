global.Twenty = require('./observer/bind.js').default;
// Twenty.registerComponent('child',{
//     props: ['trans'],
//     templete: function() { return (`<div ref="div">
//             <h2 ref="h2">child</h2>
//             <h1>{{abcd}}</h1>
//             <p>{{ trans }}</p>
//         </div>`)},
//     data: {
//         abcd: 'abc child'
//     },
//     didMount: function() {
//         console.log(this.data.a,this.refs.h2)
//     }
// })

// Twenty.registerComponent('parent',{
//     templete: function() { 
//         return (`<div ref="div">
//             <h2 ref="h2" >parent</h2>
//             <h1>{{abcd}}</h1>
//             <component data-from="child" trans=${this.data.trans}></component>
//         </div>`)
//     },
//     data: {
//         trans: 'transparent',
//         // a: 'parent a 传递给 child',
//         abcd: 'abc parent'
//     },
//     didMount: function() {
//         // console.log(this.data.a,this.refs.h2)
//     }
// })
