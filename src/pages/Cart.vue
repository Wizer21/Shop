<template>
    <h1>
        Cart 
    </h1>
    <div v-for="item in itemsCart" v-bind:key="item.id"  >
        <ItemCartMin 
            v-for="sizeobj in item.sizes" 
            v-bind:key="sizeobj.size"  
            
            :item_id="item.id"
            :item="sizeobj">
        </ItemCartMin>        
    </div>
</template>

<script>
import ItemCartMin from '../components/ItemCartMin.vue'
const db = require('../lowdb/lowdb.js')

export default {
components: { ItemCartMin },
    name: 'Cart',
    computed: {
        itemsCart(){
            console.log(db.getUserCart(this.$store.state.user_id))
            return db.getUserCart(this.$store.state.user_id)
        } 
    }    
}
</script>
