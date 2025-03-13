<script lang="ts" setup>

const {data: navigation} = await useAsyncData('navigation', () => queryCollectionNavigation('pages'), {default: () => []})
const {data: files} = useLazyFetch('/api/search.json', {default: () => [], server: false})

provide('navigation', navigation)
</script>

<template>
	<div>
		<AppHeader/>
		<slot/>
		<AppFooter/>
		<ClientOnly>
			{{files}}
		</ClientOnly>
	</div>
</template>
