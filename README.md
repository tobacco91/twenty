+ 前端组件化框架


+ 引入index.js

```
    html
    <div id="twenty">
        <component data-from="parent"></component>
        <h1 data-if="a > b">
            {{a}} > {{b}}
        </h1>
        <h1 data-else onclick="{{ mesg }}">
            {{a}}c{{b}}
        </h1>
    </div>
```
```
    javascript
    var app = Twenty.watch(document.querySelector('#twenty'),{
        a:1,
        b:2,
        mesg: () => {
            console.log(123)
        }
    })
```
```
组件注册
let child = Twenty.registerComponent('child',{
    props: ['trans'],
    templete: function() { return (`<div ref="div">
            <h2 ref="h2">child</h2>
            <h1>{{abcd}}</h1>
            <p>{{ trans }}</p>
        </div>`)},
    data: {
        abcd: 'abc child'
    },
    didMount: function() {
        child.setState({
            abcd: 3
        })
        console.log(this.data.a,this.refs.h2)
    }
})
Twenty.registerComponent('parent',{
    templete: function() { 
        return (`<div ref="div">
            <h2 ref="h2" >parent</h2>
            <h1>{{abcd}}</h1>
            <component data-from="child" trans=${this.data.trans}></component>
        </div>`)
    },
    data: {
        trans: 'transparent',
        // a: 'parent a 传递给 child',
        abcd: 'abc parent'
    },
    didMount: function() {
        // console.log(this.data.a,this.refs.h2)
    }
})
```
```
state更新
componentName.setState({
        a: 3
})
```