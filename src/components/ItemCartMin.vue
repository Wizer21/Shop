<template>
    <div :id="id" class="main">
        <div id="image_holder">
            <img :src="itemImageSrc" alt="itemImage">
        </div>
        <div id="text">
            <p id="title">
                {{ entireItem.name }}
            </p>   
            <p id="size">
                {{ price }}€
            </p> 
            <p id="size">
                {{ item_size }}
            </p>  
        </div>     
        <p id="quantity">
            {{ quantity }}
        </p>
        <div id="buttons">
            <button @click="add" class="button_add">
                +
            </button>            
            <button @click="remove">
                -
            </button>            
            <button @click="delete_item">
                Delete
            </button>
        </div>
    </div>
</template>

<script>
const db = require('../lowdb/lowdb.js')
    export default {    
        name: 'ItemCardMin',
        props: {
            item_size: {
                type: String,
                required: true,
            },
            item_quantity: {
                type: Number,
                required: true,
            },
            item_id: {
                type: Number,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            }
        },
        data(){
            return {
                local_item_quantity: this.item_quantity
            }
        },
        computed: {
            id(){
                return `main${this.index}`
            },
            itemImageSrc(){
                return require(`../images/${db.getImageSrc(this.item_id, this.item_size)}`)
            },
            entireItem(){
                return db.getItemFromId(this.item_id)
            },
            quantity(){
                return this.local_item_quantity
            },
            price() {
                return db.getItemSellPrice(this.item_id, this.item_size)
            }
        },
        methods: {
            add(){
                this.local_item_quantity +=  1
                db.addToCart(this.$store.state.user_id, this.item_id, this.item_size)
                this.$emit("update")  
            },
            remove(){
                if (this.local_item_quantity != 0){
                    this.local_item_quantity -=  1
                    db.removeFromCart(this.$store.state.user_id, this.item_id, this.item_size)
                    this.$emit("update")   
                }
            },
            delete_item() {
                db.deleteItemFromCart(this.$store.state.user_id, this.item_id, this.item_size)
                
                this.$emit("delete_item")                       
            }
        },
    }
</script>

<style scoped>
.main
{
    position: relative;
    overflow: hidden;
    display: flex;
    border: 1px solid black;
    margin: 1em;
    margin-left: 5vw;
    margin-right: 5vw;
    flex-wrap: wrap;

    border-radius: 1em;
    transition-duration: 500ms;
}
.main:hover
{
    transition-duration: 500ms;
    transform: scale(1.05);
}
#image_holder
{
    grid-column: 1;
    height: 25vh;
    width: 25vh;
}
img{
    object-fit: cover;
    width:100%; 
    height:100%;
}
#text
{
    flex: 1
}
#title
{
    padding: 0.2em;
    margin: 0em;
    word-wrap: break-word;
    font-size: 2em;
}
#size
{    
    font-size: 0.9em;  
    margin: 0em;
    margin-left: 0.2em;  
    padding: 0.3em;
    font-size: 1.5em;    
}
#price
{    
    font-size: 0.9em;  
    margin: 0em;
    margin-left: 0.2em;  
    padding: 0.3em;
    font-size: 1.5em;  
}
#buttons
{
    margin: 0em;
    padding: 0em;
}
#buttons button
{
    height: 100%;
    width: 10vw;
    background-color: transparent;
    border: 0px;
    border-left: 1px solid black;
    transition-duration: 400ms;
    outline: none;
    padding: 0em;
    font-size: 1.5em;
}
#buttons button:hover
{
    transition-duration: 400ms;
    width: 15vw;
}
#buttons button:active
{
    transition-duration: 200ms;
    transform: translate(-1em, 0em);
}
#quantity
{
    height: min-content;
    font-size: 2em;
    margin-top: auto;
    margin-bottom: auto;
    text-align: center;

    padding: 0.5em;
    border: 1px solid black;
    border-radius: 0.5em;

    margin: 0.6em;
}
@media screen and (max-width: 1000px){
    #buttons
    {
        height: 4vh;
        width: 100%;
        border-top: 1px solid black;
    }
    #buttons button
    {
        width: 33%;
        font-size: 1.2em;
    }
    #buttons button:hover
    {
        transition-duration: 400ms;
        width: 33%;
    }
    #buttons button:active
    {
        transition-duration: 200ms;
        transform: translate(-1em, 0em);
        width: 30%;
    }
    .button_add
    {
        border: none !important;
    }
    #title
    {
        font-size: 1.5em;
    }
    #size
    {    
        margin: 0em;
        font-size: 1.3em;
    }
    #quantity
    {
        position: absolute;
        font-size: 1.4em;

        margin: 0.6em;
        margin-bottom: 3em;

        right: 0px;
        bottom: 0px;
    }
}

</style>
