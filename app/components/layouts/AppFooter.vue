<script lang="ts" setup>
const appConfig = useAppConfig();
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<Busuanzi />
		<div class="text-center">
			<p class="text-sm text-gray-500">
				&copy; {{ new Date().getFullYear() }} {{ appConfig.siteName }}
			</p>
		</div>
	</div>
</template>
