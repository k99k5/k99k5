<script lang="ts" setup>
const props = defineProps({
    posts: {
        type: Array,
        required: true
    }
})
</script>

<template>
	{{ props.posts }}
</template>

<style scoped>

</style>
