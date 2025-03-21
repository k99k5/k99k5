<script lang="ts" setup>

</script>

<template>
	<div class="flex flex-col w-full h-full min-h-screen items-center p-10 [&_*]:transition-all [&_*]:duration-300">
		<div class="max-w-[440px] flex-1 w-full h-full flex flex-col gap-10">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>

</style>
