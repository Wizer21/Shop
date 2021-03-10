<template>
    <h1>
        Admin 
    </h1>
    <div id='item_list'>
        <AdminItemCard v-for="obj in objects" :key="obj.id" :item="obj">
        </AdminItemCard>
    </div>
</template>

<script>
import AdminItemCard from '../components/AdminItemCard.vue'
const db = require('../lowdb/lowdb.js')
export default {
components: { AdminItemCard },
    name: 'Admin',
    computed: {
        objects(){
            return db.getObjectList()
        }
    }
}
</script>

