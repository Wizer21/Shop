<template>
    <div id="main_cart">
        <div id="header">
            <a href="/main">
                <button class="button">
                    Home
                </button>  
            </a>
            <a href="/shop">
                <button class="button">
                    Shop
                </button>   
            </a>  
        </div>
        <p id="error">
            Your cart is empty &#128528;
        </p>
        <ItemCartMin
            v-for="(obj, index_p) in getItemList" 
            :key="index_p"  
            
            :item_size="obj.size"
            :item_quantity="obj.quantity"
            :item_id="obj.item_id"
            :index="index_p"

            @delete_item="deleteElement(index_p)"
            >
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
        calculateItemsCart(){
            return db.getUserCart(this.$store.state.user_id)
        },
        calculateItemList(){
            let list = []
            let database = db.getUserCart(this.$store.state.user_id)

            for (let item of database){
                for (let size of item.sizes){
                
                    size.item_id = item.id
                    list.push(size)
                }
            }
            return list
        },
        getItemList() {
            return this.itemList
        }
    },
    methods: {
        deleteElement(index) {
            let my_list = []
            for (let i = 0; i < this.itemList.length ; i++){
                if( i != index){
                    my_list.push(this.itemList[i])
                }
            }
            this.itemList = my_list
            this.checkForEmptyCart()
        },
        checkForEmptyCart(){
            console.log("this.getItemList.length", this.getItemList.length)
            if (this.getItemList.length == 0){   
                document.getElementById("error").style.display = "block"
            }
        }
    },
    data(){
        return {
            itemList: [],
            matter_list: {},
            bodiesList: []
        }
    },
    beforeMount() {
        this.itemList = this.calculateItemList
    },
    mounted(){
        this.checkForEmptyCart()
    }
}
</script>

<style scoped>
#main_cart
{
    position: relative;
    overflow: hidden;
    
}
#header
{
    display: flex;
    flex-direction: row;
}
.button
{
    width: 50vw;
    height: 8vh;

    background-color: transparent;
    border: 0px solid transparent;
    border-bottom: 1px solid black;
    transition-duration: 300ms;
    font-size: 2em;
    margin-bottom: 2em;
    outline: none;
}
.button:hover
{
    transition-duration: 300ms;
    transform: translate(0em, 0.5em);
}
.button:active
{
    transition-duration: 50ms;
    transform: translate(0em, 0.2em);
}
#error
{
    display: none;
    text-align: center;
    font-size: 2em;
}
</style>
