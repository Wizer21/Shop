<template>

    <div class="main">
       
    </div>
</template>

<script scoped>
const db = require('../lowdb/lowdb.js')
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
            item_id: {
                type: Number,
                required: true,
            }
        }
    }
</script>

<style scoped>
 
</style>
