<template>
    <a href="/main">
        <button id="main_button">
            Home
        </button>
    </a>
    <h1>
        Admin 
    </h1>
    <h2 class="sub_title">
        Object List
    </h2>
    <div>
        <AdminItemCard v-for="obj in objects" :key="obj.id" :item="obj">
        </AdminItemCard>
    </div>
    
    <h2 class="sub_title">
        Order List
    </h2>
    <AdminOrder v-for="ord in orders" :key="ord.id" :my_order="ord">
    </AdminOrder>
</template>

<script>
import AdminItemCard from '../components/AdminItemCard.vue'
import AdminOrder from '../components/AdminOrder.vue'
const db = require('../lowdb/lowdb.js')
export default {
components: { AdminItemCard, AdminOrder },
    name: 'Admin',
    computed: {
        objects(){
            return db.getObjectList()
        },
        orders(){
            return db.getOrders()
        }
    }
}
</script>

<style scoped>
h1
{
    margin: 1em;
    font-size: 4em;
}
.sub_title
{
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;
    margin-left: 25vw;
    margin-right: 25vw;

    margin-top: 10vh;
    padding: 0.2em;
}
#main_button
{
    position: relative;
    background-color: transparent;
    font-size: 2em;

    width: 100%;
    height: 10vh;
    transition-duration: 300ms;
}
#main_button:hover
{
    height: 14vh;
    transition-duration: 300ms;
}
#main_button:active
{
    height: 12vh;
    transition-duration: 50ms;
}
</style>

