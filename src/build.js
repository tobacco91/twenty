global.Twenty = require('./observer/bind.js').default;
let child = Twenty.registerComponent('child',{
    props: ['trans'],
    templete: function() { return (`<div ref="div">
            <h2 ref="h2">child</h2>
            <h1>{{abcd}}</h1>
            <p>{{trans}}</p>
        </div>`)},
    data: {
        abcd: 'abc child'
    },
    didMount: function() {
        // setTimeout(() => {
        //     child.setState({
        //         abcd: 'abc child2'
        //     })
        // }, 1000);

        console.log(this.data.a,this.refs.h2)
    }
})

let parent = Twenty.registerComponent('parent',{
    templete: function() { 
        return (`<div ref="div">
            <h2 ref="h2" >parent</h2>
            <h2>{{a}}</h2>
            <h1 onclick="{{ func }}">{{abcd}}</h1>
            <component data-from="child" trans="{{trans}}"></component>
        </div>`)
    },
    data: {
        trans: 'transparent',
        // a: 'parent a 传递给 child',
        abcd: '点击我',
        a: '第二个改变',
        func: function() {
            //console.log('parent')
            parent.setState({
                trans: 'change'
            })
            parent.setState({
                abcd: 'abcd'
            })
            parent.setState({
                abcd: '点击我 2',
                a: '第二个改变 2'
            })
        }
    },
    didMount: function() {
        console.log(this,'state')
    }
})
