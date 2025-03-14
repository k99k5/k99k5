<script lang="ts" setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const route = useRoute()

const {data: page} = await useAsyncData(
    'archive',
    () => queryCollection('pages').where('path', 'LIKE', route.path).first()
);

const {data: posts} = await useAsyncData(
    route.path,
    () => queryCollection('posts').all()
)

if (!page.value) {
    throw createError({statusCode: 404, statusMessage: t('Page not found'), fatal: true})
}


useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description
})

defineOgImageComponent('Saas')
</script>

<template>
	<template v-if="page">
		<ContentRenderer v-if="!['archive'].includes(page?.layout)" :data="{posts}" :value="page"/>
		<Posts v-else-if="['archive'].includes(page?.layout)" :posts="posts"></Posts>
	</template>
</template>
