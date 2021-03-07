<template>
    <div id="main">
        <h1>
            Cart 
        </h1>    
        <div>
            <ItemCartMin
                v-for="(obj, index) in itemList" 
                :key="index"  
                
                :item_id="obj.item_id"
                :item_size="obj.size"
                :item_quantity="obj.quantity"

                @delete_item="deleteElement(index)"
                >
            </ItemCartMin>        
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
        }
    },
    methods: {
        deleteElement(index) {
            this.itemList.splice(index, 1)
            console.log(this.itemList)
        }
    },
    data(){
        return {
            itemList: []
        }
    },
    beforeMount() {
        this.itemList = this.calculateItemList
    }
}
</script>

<style scoped>
#main
{
    position: relative;
    overflow: hidden;
}
</style>
