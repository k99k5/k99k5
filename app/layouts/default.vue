<script lang="ts" setup>

const {data: navigation} = await useAsyncData(
    'navigation',
	() => queryCollectionNavigation('pages')
		.where('navigation', '=', true)
		.where('status','=','publish'),
	{default: () => []}
)
const {data: files} = useLazyFetch('/api/search.json', {default: () => [], server: false})

provide('navigation', navigation)
</script>

<template>
	<Main>
		<AppHeader/>
		<div class="flex-1 flex flex-col">
			<slot/>
		</div>
		<AppFooter/>
	</Main>
</template>
