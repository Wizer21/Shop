<template>
    <h1>
        Shop
    </h1>
    <div v-for="obj in items" v-bind:key="obj.id">    
        <ItemCard :object="obj"> 
        </ItemCard>
    </div>
</template>

<script>
import ItemCard from '../components/ItemCard.vue'

export default {
components: { ItemCard },

    computed: {
        items () {
            return this.$store.state.item_list
        }
    }
}
</script>
