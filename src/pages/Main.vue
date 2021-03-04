<template>
    <p>
        MAIN {{ this.$store.state.count }}
        {{ this.$store.state.object[0].name }}
    </p>
    <button @click="this.$store.commit('increment')">
        Incrementer
    </button>
</template>

<script>

export default {
    name: 'Main',
}
</script>
