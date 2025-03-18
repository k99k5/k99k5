<script setup lang="ts">
const props = defineProps({
	tags: {
		type: Array,
		required: true,
	},
})
</script>

<template>
	<div class="flex flex-wrap gap-2">
		<Tag v-for="(tag,idx) in props.tags" :severity="['secondary','success','info'][idx % 3]" :value="tag" class="!py-2 !px-3"></Tag>
	</div>
</template>

<style scoped>

</style>
