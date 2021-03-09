<template>
    <div id="shop_main">
        <div id="floating_image">
            <img id="floating_img" ><img>
        </div>
        <div id="nav_bar">
            <input id="search" placeholder="Search" @input="typeEvent">
            <a href="">
                <button class="button">
                    Filter
                </button>
            </a>
            <a v-if="state.logged && !state.isAdmin" href="/cart">
                <button class="button" id="cart_button">
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

                :name="obj.name"
                class="card_element"
                > 
            </ItemCard>
        </div>
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
        }  ,          
        state(){
            console.log(this.$store.state.logged)
            return this.$store.state
        }
    },
    methods: {
        updateCart(){
            document.getElementById('cart_button').textContent = `Cart ${db.getCardLength(this.$store.state.user_id)}`
        },
        typeEvent(event){
            let text_to_find = event.target.value

            let cardList = document.getElementsByClassName("card_element")

            for (let card of cardList){
                if (card.getAttribute('name').toLowerCase().indexOf(text_to_find.toLowerCase()) !== -1){
                    card.style.display = 'inline'
                }
                else{                 
                    card.style.display = 'none'
                }
            }
        }        
    },
    mounted(){
        this.updateCart()
    }
}
</script>

<style scoped>
#shop_main
{
    position: relative;
    overflow: hidden;
}
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
    width: 100vw;
    border: 1px solid black;

    display: flex;
    flex-wrap: wrap;
}
.button
{
    height: 100%;
    width: 15vw;
    background-color: transparent;
    border: 0px solid transparent;
    border-left: 1px solid black;

    outline: none;
    transition-duration: 300ms;
    font-size: 1.5em;
}
.button:hover
{
    transition-duration: 200ms;
    transform: translate(-0.5em, 0em);

}
.button:active
{
    transition-duration: 50ms;
    transform: translate(-0.9em, 0em);

}
#search
{
    height: 10vh;
    background-color: transparent;
    border: 0px solid transparent;
    margin-right: auto;
     
    outline: none;
    padding: 1em;
    font-size: 1.5em;
}
@media screen and (max-width: 800px){
    #search
    {
        width: 100vw;
    }
    .button
    {
        border-top: 1px solid black;
        border-left: 0px solid transparent;
        flex-grow: 1;
        width: 100%;
        height: 10vh;
    } 
    a
    {
        flex-grow: 1;
    }
    .button:hover
    {
        transition-duration: 200ms;
        transform: translate(0em, -0.5em);

    }
    .button:active
    {
        transition-duration: 50ms;
        transform: translate(0em, -0.25em);

    }
}
</style>