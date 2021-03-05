<template>
    <h1>
        Shop
    </h1>
    <div v-for="obj in items" v-bind:key="obj.id">    
        <ItemCard :item="obj" :displayed_size="obj.sizes[1].s_name"> 
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
