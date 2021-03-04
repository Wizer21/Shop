<template>
    <div id="main">
        <div id="card">
            <div id="image_holder">
                <img :src="require(`../images/${item.sizes[0].image}`)"><img>
            </div>
        </div>
        <div id="panel">
            <h2 class="no_margin">
                {{ item.name }}
            </h2>
            <p id="description_scroll" class="no_margin no_scrollbar align_left">
                {{ item.description }}
            </p>
            <p class="no_margin">
                {{ item.stock }}
            </p>
            <div v-if="item.sizes.length > 1">
                <button v-for="obj in item.sizes" v-bind:key="obj.s_name">
                    {{ obj.s_name }}
                </button>
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
        }
    },
    mounted() {
        // Open and close the side panel on hover event
        const card = document.getElementById("card")
        const panel = document.getElementById("panel")
        console.log(card)
        card.addEventListener("mouseenter", () => {
            panel.style.transform = 'translate(13em, 0em)'
        })
        card.addEventListener("mouseleave", () => {
            if (!panel.matches(':hover')){
                panel.style.transform = 'translate(0em, 0em)'
            }            
        })
        panel.addEventListener("mouseleave", () => {
            if (!card.matches(':hover')){
                panel.style.transform = 'translate(0em, 0em)'
            }            
        })
    }
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
        background-color: blue;
        border: 1px solid black;
    }
    #panel{
        grid-row: 1;
        grid-column: 1;

        padding: 1em;
        top: -20em;
        height: 20em;
        width: 13em;
        border: 1px solid red;

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



</style>
