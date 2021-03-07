<template>
    <div id="floating_image">
        <img id="floating_img" ><img>
    </div>
    <div id="nav_bar">
        <input id="search" placeholder="Search" >
        <button class="button">
            Filter
        </button>
        <a href="/cart">
            <button class="button">
                Cart
            </button>
        </a>
         <a href="/main">
            <button class="button">
                Home
            </button>
        </a>
    </div>
    <div id="item_list">    
        <ItemCard 
            v-for="obj in items" 
            v-bind:key="obj.id" 
            
            :item="obj" 
            :displayed_size="obj.sizes[0].s_name" 
            :item_id="obj.id" 

            @updatedCart="updateCart"
            > 
        </ItemCard>
    </div>

</template>

<script>
import ItemCard from '../components/ItemCard.vue'
const db = require('../lowdb/lowdb.js')

export default {
components: { ItemCard },
    computed: {
        items () {
            return db.getObjectList()
        }
    },
    methods: {
        updateCart(){
            document.getElementById('cart_button').textContent = `Cart ${db.getCardLength(this.$store.state.user_id)}`
        }
    },
    mounted(){
        this.updateCart()
    }
}
</script>

<style scoped>
#floating_image
{
    position: absolute;
    height: 10em;
    width: 10em;
    border-radius: 50%;
    z-index: 3;

    pointer-events: none;
    opacity: 0;

    overflow: hidden;
    transition-duration: 200ms;
}     
#floating_img
{
    position: absolute;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}  
#item_list
{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
#nav_bar
{
    position: relative;
    height: 10vh;
    width: 100vw;
    border: 1px solid black;

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: flex-start;
}
.button
{
    position: relative;
    height: 10vh;
    min-width: 20vw;
    background-color: transparent;
    border: 0px solid transparent;
    border-left: 1px solid black;

    outline: none;
    transition-duration: 300ms;
}
.button:hover
{
    transition-duration: 200ms;
    transform: translate(-1em, 0em);

}
.button:active
{
    transition-duration: 25ms;
    transform: translate(0.5em, 0em);

}
#search
{
    position: relative;
    height: 10vh;
    background-color: transparent;
    border: 0px solid transparent;
    margin-right: auto;
     
    outline: none;
    padding: 1em;
}
@media screen and (max-width: 800px){
    #nav_bar
    {
        height: 20vh;
    }
    #search
    {
        width: 100vw;
    }
    .button
    {
        border-top: 1px solid black;
        width:max-content;
        width: 33.33vw;
        flex: 1;
    }
}
</style>