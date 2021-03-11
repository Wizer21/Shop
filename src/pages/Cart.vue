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
                @update="calculateTotal()"
                >
            </ItemCartMin>  

            <div id="conclusion_footer">
                <p id="delivery">
                    3 days
                </p>
                <p id="articles">
                    {{ totalObjects }} articles
                </p>
                <p id="price">
                    {{ totalPrice }}€
                </p>
            </div>
            <div id="validatePanel">
                <button @click="validate">
                    Validate your cart 
                </button>
            </div>
        </div>   
    </div>   
    <div id="order_complete">
        <p>
            Thanks you for ordering
        </p>
        <a href="/main">            
            <button id="home_button">
                <p>
                    Home
                </p>
            </button>
        </a>
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
            this.calculateTotal()
        },
        calculateTotal(){
            let calcTotalPrice = 0
            let calcTotalObjects = 0

            for (let item of this.itemList){
                calcTotalPrice += db.getItemSellPrice(item.item_id, item.size) * item.quantity
                calcTotalObjects += item.quantity
            }
            this.totalPrice = calcTotalPrice.toFixed(2)
            this.totalObjects = calcTotalObjects
        },
        validate() {
            let order = {}
            order['user_id'] = this.$store.state.user_id
            order['order'] = []

            let cart = db.getUserCart(order['user_id'])
            for (let c of cart){
                for (let s of c.sizes){
                    order['order'].push({
                        object_id: c.id,
                        object_size: s.size,
                        quantity: s.quantity,
                    })
                }
            }
            db.pushOrder(order)
            document.getElementById('order_complete').style.top = `0px`
            document.getElementById('main_cart').style.display = 'none'
        }
    },
    data(){
        return {
            itemList: [],
            totalPrice: 0,
            totalObjects: 0
        }
    },
    mounted() {
        this.itemList = this.calculateItemList
        this.calculateTotal()

        let homebutton = document.getElementById('home_button')
        homebutton.addEventListener('mouseup', () => {
            homebutton.children[0].style.transform = 'translate(0em, -10em)'
        })
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
#conclusion_footer
{
    position: relative;
    display: grid;
    grid-template-columns: 2, 2fr;
    grid-auto-rows: minmax(100px, auto);

    margin: 2em;
    margin-left: 5vw;
    margin-right: 5vw;

    background-color: white;  
    border: 1px solid black;
    border-radius: 1em;
}
#price
{
    font-size: 2em;
    margin: 1em;
}
#delivery
{
    position: relative;
    grid-column: 1;
    grid-row: 1;
    margin: 1em;

    font-size: 2em;
    text-align: center;
    align-self: center;
}
#articles
{    
    position: relative;
    grid-column: 1;
    grid-row: 2;
    margin: 1em;
    
    font-size: 2em;
    text-align: center;
    align-self: center;
}
#price
{
    position: relative;
    grid-column: 2;
    grid-row: 1 / 3;
    
    font-size: 4em;
    text-align: center;
}
#validatePanel
{
    position: relative;
    display: flex;

    justify-content: space-around;

    height: 12vh;

    margin: 1em;
    margin-left: 5vw;
    margin-right: 5vw;

    border-radius: 1em;

    transition-duration: 500ms;
}
#validatePanel button
{
    position: relative;
    font-size: 2em;
    margin: 2vh;
    width: 45vw;

    background-color: white;
    border-radius: 1em;
    border: 3px solid black;
    color: black;
    transition-duration: 400ms;    
    outline: none;
}
#validatePanel button:hover
{
    transition-duration: 400ms;
    border: 0px solid transparent;
    transform: scale(1.05);
    border: 1px solid rgb(209, 209, 209);
}
#validatePanel button:active
{
    transition-duration: 200ms;
    transform: scale(0.9);
}
@media screen and (max-width: 800px){
    #validatePanel button
    {
        font-size: 1em;
    }
    #price
    {        
        font-size: 2em;
        align-self: center;
    }
    #delivery
    {
        font-size: 1.5em;
        margin: 0.5em;
    }
    #articles
    {    
        font-size: 1.5em;
        margin: 0.5em;
    }
}
#order_complete
{
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    top: -100vh;
    left: 0px;
    background-color: white;
    z-index: 2;
    transition-duration: 2000ms;
}
#order_complete p 
{
    font-size: 4em;
}
#home_button
{
    width: 13em;
    height: 10vh;
    background-color: transparent;
    border: 1px solid rgb(209, 209, 209);
    transition-duration: 400ms;
    outline: none;
    overflow: hidden;
}
#home_button:hover
{
    width: 16em;
    border: 1px solid black;
    transition-duration: 400ms;
    border-radius: 20px;
    padding-left: 1em;
    padding-right: 1em;
}
#home_button p
{
    margin: 0px;
    transition-duration: 400ms;
    font-size: 2em;
}
#home_button:hover p
{
    top: -0.11em;
    transition-duration: 400ms;
    font-size: 2.5em;
}
#home_button:active p
{    
    transition-duration: 400ms;
    transform: translate(0em, 0.4em);
    outline: none;
}
</style>
