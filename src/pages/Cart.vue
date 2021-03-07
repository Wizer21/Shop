<template>
    <div id="main">
        <h1>
            Cart 
        </h1>    
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
