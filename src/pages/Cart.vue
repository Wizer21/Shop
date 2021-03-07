<template>
    <div id="main">
        <div id="header">
            <a href="/main">
                <button class="button">
                    Home
                </button>  
            </a>
            <a href="/shop">
                <button class="button">
                    Shop
                </button>   
            </a>  
        </div>
        <ItemCartMin
            v-for="(obj, index_p) in getItemList" 
            :key="index_p"  
            
            :item_size="obj.size"
            :item_quantity="obj.quantity"
            :item_id="obj.item_id"
            :index="index_p"

            @delete_item="deleteElement(index_p)"
            >
        </ItemCartMin>  
        <div id="scene_container">

        </div>
    </div>   
</template>

<script>
import Matter from 'matter-js';    
import ItemCartMin from '../components/ItemCartMin.vue'
const db = require('../lowdb/lowdb.js')

export default {
components: { ItemCartMin },
    name: 'Cart',
    computed: {
        calculateItemsCart(){
            return db.getUserCart(this.$store.state.user_id)
        },
        calculateItemList(){
            let list = []
            let database = db.getUserCart(this.$store.state.user_id)

            for (let item of database){
                for (let size of item.sizes){
                
                    size.item_id = item.id
                    list.push(size)
                }
            }
            return list
        },
        getItemList() {
            return this.itemList
        }
    },
    methods: {
        deleteElement(index) {
            let my_list = []
            for (let i = 0; i < this.itemList.length ; i++){
                if( i != index){
                    my_list.push(this.itemList[i])
                }
            }
            this.itemList = my_list
        },
        populateScene(Bodies, World, engine){
            for(let i of this.itemList){
                let src = db.getImageSrc(i.item_id, i.size)
                for (let e = 0; e < i.quantity; e++){
                    this.createItem(Bodies, World, engine, src)
                }
            }
        },
        createItem(Bodies, World, engine, url){
            console.log("window.innerWidth", window.innerWidth)

            var plant = Bodies.rectangle(Math.random() * window.innerWidth, Math.random() * window.innerHeight/2 , 50, 80)
            plant.render.sprite.texture = require(`../images/min/${url}`)

            World.add(engine.world, [plant])
        },
    },
    data(){
        return {
            itemList: []
        }
    },
    beforeMount() {
        this.itemList = this.calculateItemList
    },
    mounted(){
        // module aliases
        var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies

        // create an engine
        var engine = Engine.create()

        let container = document.getElementById("scene_container")  
        
        // create a renderer
        let render_2d = Render.create({
        element: container,
        engine: engine,
        options: {
            wireframes: false,
            height: window.innerHeight/2,
            width: window.innerWidth,
            background: 'transparent',
        }
        })

        let top = Bodies.rectangle(0, 0, window.innerWidth * 2, 20, { isStatic: true })
        let bottom = Bodies.rectangle(0, window.innerHeight/2, window.innerWidth * 2, 20, { isStatic: true })
        let left = Bodies.rectangle(0, 0, 20, window.innerHeight, { isStatic: true })
        let right = Bodies.rectangle(window.innerWidth -10, 0, 20, window.innerHeight, { isStatic: true })

        // mouse
        let mouse = Matter.Mouse.create(render_2d.canvas)
        let mouse_Constraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                render_2d: { visible: false }
            }
        })
        render_2d.mouse = mouse

        // Enable scroll page over the scene
        mouse.element.removeEventListener("mousewheel", mouse_Constraint.mouse.mousewheel)
        mouse.element.removeEventListener("DOMMouseScroll", mouse_Constraint.mouse.mousewheel)

        // Add bodies to the world
        World.add(engine.world, [top, bottom, left, right, mouse_Constraint])

        // run the engine
        Engine.run(engine)
        // run the renderer
        Render.run(render_2d)

        // Create items
        this.populateScene(Bodies, World, engine)
    }
}
</script>

<style scoped>
#main
{
    position: relative;
    overflow: hidden;
}
#header
{
    display: flex;
    flex-direction: row;
}
.button
{
    width: 50vw;
    height: 8vh;

    background-color: transparent;
    border: 0px solid transparent;
    border-bottom: 1px solid black;
    transition-duration: 300ms;
    font-size: 2em;
    margin-bottom: 2em;
    outline: none;
}
.button:hover
{
    transition-duration: 300ms;
    transform: translate(0em, 0.5em);
}
.button:active
{
    transition-duration: 50ms;
    transform: translate(0em, 0.2em);
}
</style>
