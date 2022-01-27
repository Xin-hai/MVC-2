import "./app2.css"
import $ from "jquery"

const eventBus = $(window)

const localKey = 'app2.index'
const m = {
    data: {
        index : parseInt(localStorage.getItem(localKey)) || 0
    },
    create(){},
    delete(){},
    get(){},
    update(data){
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('index', m.data.index)
    }
}
const v = {
    el: null,
    html:(index) => {
        return` 
    <div>
        <ol class="tab-bar">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0"><span>这是1111Tab</span></li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1"><span>这是2222Tab</span></li>
        </ol>
        <ol class="tab-content">
            <li class="${index === 0 ? 'active' : ''}">1111.我的名字是Xinhai</li>
            <li class="${index === 1 ? 'active' : ''}">2222.我不满意现在的生活，但是我现在真的没办法改变它，我会努力的！</li>
        </ol>
    </div>
`},
    init(container){
        v.el = $(container)
    },
    render(index){
        if(v.el.children.length !== 0) v.el.empty()
        $(v.html(index)).appendTo($(v.el))
    }
}



const c = {
    init(container){
        v.init(container)
        v.render(m.data.index) // view = render(data)
        c.autoBindEvents()
        eventBus.on('m:updated',()=>{
            v.render(m.data.index)
        })
    },
    events:{
        'click .tab-bar li': 'x',
    },
    x(e){
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index: index})
    },
    autoBindEvents(){
        for(let key in c.events){
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0,spaceIndex)
            const part2 = key.slice(spaceIndex+1)
            v.el.on(part1,part2,value)
        }
    }
}
export default c


