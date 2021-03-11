<template>
    <div id="main">
        <div id="header">
            <p>
                {{ getUser.name }}
            </p>
            <p>
                N°{{ my_order.id }}
            </p>
        </div>
        <div v-for="object in my_order.order" :key="object.object_id" class="object_list">
            <p> {{ getItem.name }} </p>
            <p> size {{ object.object_size }} </p>
            <p> x{{ object.quantity }} </p>
        </div>
    </div>
</template>

<script>
const db = require('../lowdb/lowdb.js')
    export default {    
        name: 'AdminOrder',
        props: {
            my_order: {
                type: Object,
                required: true,
            }
        },
        computed: {
            getUser() {
                return db.getUserFromId(this.my_order.user_id)
            },
            getItem() {
                return db.getItemFromId(this.my_order.id)
            }
        }
    }
</script>

<style scoped>
#main
{
    border: 1px solid black;
    
    position: relative;
    overflow: hidden;
    margin: 1em;
    margin-left: 5vw;
    margin-right: 5vw;
}
#header
{
    display: flex;
    flex-direction: row;
}
#header p 
{
    font-size: 2em;
    margin: 0.5em;
}
.object_list
{
    display: flex;
    flex-direction: row;

    height: 0px;
    font-size: 0em;
    transition-duration: 400ms;    
}
.object_list p 
{
    font-size: 1.2em;
    margin: 0.5em;
    margin-right: 5vw;
}
#main:hover .object_list
{
    transition-duration: 400ms;    
    height: 100%;
    font-size: 1em;
} 
</style>