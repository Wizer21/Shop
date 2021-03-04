<template>
  <div>
      {{ object.name }}
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    object: {}
  }
}
</script>
