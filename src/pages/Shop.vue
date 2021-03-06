<template>
    <div id="floating_image">
        <img id="floating_img" ><img>
    </div>
    <h1>
        Shop
    </h1>
    <a href="/cart">
        <button id="cart_button">
            Cart
        </button>
    </a>
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
            console.log("in")
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
}
</style>