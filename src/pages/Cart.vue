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
        <p v-if="isCartEmpty" id="error">
            Your cart is empty &#128528;
        </p>
        <div v-else>
            <ItemCartMin
                v-for="(obj, index_p) in getItemList" 
                :key="index_p"  
                
                :item_size="obj.size"
                :item_quantity="obj.quantity"
                :item_id="obj.item_id"
                :index="index_p"

                @delete_item="deleteElement(index_p)"
                @update="calculateTotalPrice()"
                >
            </ItemCartMin>  
            <div id="conclusion">
                <p id="price">
                    {{ totalPrice }}€
                </p>
            </div>
        </div>        
    </div>   
</template>

<script> 
import ItemCartMin from '../components/ItemCartMin.vue'
const db = require('../lowdb/lowdb.js')

export default {
components: { ItemCartMin },
    name: 'Cart',
    computed: {
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
        },
        isCartEmpty(){     
            return this.getItemList.length == 0
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
            this.calculateTotalPrice()
        },
        calculateTotalPrice(){
            let total = 0

            for (let item of this.itemList){
                total += db.getItemSellPrice(item.item_id, item.size) * item.quantity
            }
            this.totalPrice = total.toFixed(2)
        }
    },
    data(){
        return {
            itemList: [],
            totalPrice: 0
        }
    },
    created() {
        this.itemList = this.calculateItemList
        this.totalPrice = this.calculateTotalPrice
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
    text-align: center;
    font-size: 2em;
}
#conclusion
{
    position: relative;
    height: 30vh;

    margin: 1em;
    margin-left: 5vw;
    margin-right: 5vw;

    border: 1px solid black;
    border-radius: 1em;
}
#price
{
    font-size: 2em;
    margin: 1em;
}
</style>
