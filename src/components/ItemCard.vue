<template>
    <div id="floating_image">
        <img id="floating_img" :src="require(`../images/${getList.image}`)"><img>
    </div>
    <div id="main">
        <div id="card">
            <div id="image_holder">
                <img :src="require(`../images/${getList.image}`)"><img>
            </div>
        </div>
        <div id="panel">
            <h2 class="no_margin">
                {{ item.name }}
            </h2>
            <p id="description_scroll" class="no_margin no_scrollbar align_left">
                {{ item.description }}
            </p>
            <div v-if="item.sizes.length > 1">
                <button v-for="obj in item.sizes" v-bind:key="obj.s_name" class="size_button" :value="obj.s_name" @click="updateSize(obj.s_name)" @mouseenter="updateFlotingImg(obj.s_name)">
                    {{ obj.s_name }}
                </button>
            </div>
            <div id="sidebyside">
                <p class="no_margin minimize col_1">
                    avaible {{ getList.stock }}
                </p>
                <p class="col_2">
                    {{ getList.sell_p }} €
                </p>
            </div>    
        </div>
    </div>
</template>

<script>
    export default {    
        name: 'ItemCard',
        props: {
            item: {
                type: Object,
                required: true,
            },    
            displayed_size: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                new_size: ""
            }
        },
        computed: {
            getList() {
                // this.new_size == "" ? this.props.displayed_size : this.new_size
                // condition ? true : false
                const local_size = (this.new_size == "" ? this.displayed_size : this.new_size)
                for (let size of this.item.sizes){
                    if (size.s_name == local_size){
                        return size
                    }
                } 
                if (this.item.sizes.length > 0){
                    return this.item.sizes[0]
                }
                return {                    
                    s_name: 'M',
                    buy_p: '0',
                    tva: '20%',
                    sell_: '0',
                    image: 'plant',
                    stock: 0,                    
                }
            },
        },
        methods:{            
            updateSize(s_name){
                this.new_size = s_name
            },
            updateFlotingImg(s_name){
                const floating_img = document.getElementById("floating_img")

                for (let size of this.item.sizes){
                    if (size.s_name == s_name){
                        floating_img.src = require(`../images/${size.image}`)
                        return
                    }
                } 
            }
        },
        mounted() {
            // Open and close the side panel on hover event
            const card = document.getElementById("card")
            const panel = document.getElementById("panel")
            console.log(card)
            card.addEventListener("mouseenter", () => {
                panel.style.transform = 'translate(13em, 0em)'
                card.style.transform = 'scale(1.05)'
            })
            card.addEventListener("mouseleave", () => {
                if (!panel.matches(':hover')){
                    panel.style.transform = 'translate(0em, 0em)'
                    card.style.transform = 'scale(1)'
                }            
            })
            panel.addEventListener("mouseleave", () => {
                if (!card.matches(':hover')){
                    panel.style.transform = 'translate(0em, 0em)'
                    card.style.transform = 'scale(1)'
                }            
            })

            const sizes = document.getElementsByClassName("size_button")
            const floating_img = document.getElementById("floating_img")        
            let isIn = false
            for (let size of sizes){
                size.addEventListener("mouseenter", event => {
                    isIn = true
                    floating_img.style.opacity = 1
                    updateFloatingPosition(event)
                    
                })
                size.addEventListener("mouseleave", () => {
                    isIn = false
                    floating_img.style.opacity = 0
                })
                size.addEventListener("mousemove", event => {
                    if (isIn){
                        updateFloatingPosition(event)
                    }
                    floating_img.style.opacity = 1
                })
            }
        }
        }

        function updateFloatingPosition(event){
            const floating = document.getElementById("floating_image")
            console.log(document.fontSize)
            floating.style.top = `${event.pageY - 80}px`
            floating.style.left = `${event.pageX - 80}px`
        }
</script>

<style scoped>
    /* Boxes */
    #main{
        display: grid;        
        grid-template-columns: 1, 1fr;        
        grid-template-rows: 1, 1fr;
    }
    #card{
        
        grid-row: 1;
        grid-column: 1;

        z-index: 2;
        height: 20em;
        width: 13em;
        border: 1px solid black;
        transition-duration: 500ms;
    }
    #panel{
        grid-row: 1;
        grid-column: 1;
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;

        padding: 1em;
        top: -20em;
        height: 20em;
        width: 13em;
        background-color: #ececec;

        transition-duration: 500ms;
    }
    #image_holder{

        width: 100%;
        height: 100%;
    }
    img{
        object-fit: cover;
        width:100%; 
        height:100%;
    }
    /* Text */
    .no_margin{
       margin: 0em; 
    }
    #description_scroll{
        padding-top: 1em;
        font-size: 0.8em;
        height: 12em;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .size_button
    {
        position: static;
        background-color: white;
        margin: 0.6em;
        border-radius: 50%;
        border: 1px solid black;
        z-index: 3;

        height: 3em;
        width: 3em;
        outline: none;

        transition-duration: 200ms;
    }
    .size_button:hover
    {
        position: static;
        z-index: 3;
        transition-duration: 200ms;
        transform: scale(1.1);
        /* FLOATING IMAGE */
    }
    .minimize
    {
        font-size: 0.6em;
        color: #525252
    }
    #sidebyside
    {
        display: grid;
        grid-template-columns: 2, 1fr;        
        grid-template-rows: 1, 1fr;
    }
    .col_1
    {        
        position: relative;
        grid-column: 1;

        align-self: baseline;
        text-align: center;
    }
    .col_2
    {
        position: relative;
        margin: 0em;
        grid-column: 2;
        align-self: baseline;
        text-align: center;
    }
    #floating_image
    {
        position: absolute;
        height: 10em;
        width: 10em;
        border-radius: 50%;

        pointer-events: none;
        z-index: 2;

        overflow: hidden;
    }     
    #floating_img
    {
        position: absolute;
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
        z-index: 2;

        transition-duration: 300ms;
    }  

</style>
