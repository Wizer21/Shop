<template>
    <div id="main">
        <div id="image_holder">
            <img :src="itemImageSrc" alt="itemImage">
        </div>
        <div id="text">
            <p id="title">
                {{ entireItem.name }}
            </p>
            <p id="size">
                {{ item.size }}
            </p>          
            <p id="size">
                x{{ item.quantity }}
            </p>
        </div>
    </div>
</template>

<script scoped>
const db = require('../lowdb/lowdb.js')
    export default {    
        name: 'ItemCardMin',
        props: {
            item: {
                type: Object,
                required: true,
            },
            item_id: {
                type: Number,
                required: true,
            }
        },
        computed: {
            itemImageSrc(){
                return require(`../images/${db.getImageSrc(this.item_id, this.item.size)}`)
            },
            entireItem(){
                return db.getItemFromId(this.item_id)
            }
        }
    }
</script>

<style scoped>
#main
{
    display: flex;
    border: 1px solid black;
    margin: 1em;
    margin-left: 5vw;
    margin-right: 5vw;
    align-content: flex-start;

    border-radius: 1em;
    overflow: hidden;
    transition-duration: 2000ms;
}
#main:hover
{
    transition-duration: 300ms;
    transform: scale(1.05) translate(2em, 0em);
}
#image_holder
{
    grid-column: 1;
    height: 15vh;
    width: 15vh;
}
img{
    object-fit: cover;
    width:100%; 
    height:100%;
}
#title
{
    padding: 0.2em;
    margin: 0em;
    font-size: 1.2em; 
}
#size
{    
    font-size: 0.9em;  
    margin: 0em;
    margin-left: 0.2em;  
    padding: 0.3em;
    
}
</style>
