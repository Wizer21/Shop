<template>
    <h1>
        Shop
    </h1>
    <div v-for="obj in items" v-bind:key="obj.id">    
        <ItemCard :item="obj" :displayed_size="obj.sizes[0].s_name" :item_id="obj.id"> 
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
    }
}
</script>
