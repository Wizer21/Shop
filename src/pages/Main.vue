<template>
    <div>
        <button v-if="this.$store.state.logged">
            Profile
        </button>
        <button v-else>
            Login
        </button>
        <a href="/shop">
            <button>
                Shop
            </button>
        </a>
        <button v-if="this.$store.state.logged">
            Cart
        </button>
    </div>
</template>


<script>
export default {
    name: 'Main',
}
</script>
