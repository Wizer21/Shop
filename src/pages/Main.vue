<template>
    <div>
        <button v-if="this.$store.state.logged">
            Profile
        </button>
        <a v-else href="/login">
            <button>
                Login
            </button>
        </a>
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
