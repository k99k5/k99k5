<script lang="ts" setup>
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const route = useRoute()

const {data: page} = await useAsyncData(
    'archive',
    async () => {
        let page = await queryCollection('pages')
            .where('status', '=', 'publish')
            .orWhere(query => query
                .where('path', '=', rtrim(decodeURIComponent(route.path),'/'))
                .where('path', '=', rtrim(route.path,'/'))
            )
            .first();
        if (!page) {
            page = await queryCollection('posts')
                .where('status', '=', 'publish')
                .orWhere(query => query
                    .where('path', '=', rtrim(decodeURIComponent(route.path),'/'))
                    .where('path', '=', rtrim(route.path,'/'))
                )
                .first();
        }
        return page;
    }
);

if (!page.value) {
    throw createError({statusCode: 404, statusMessage: t('Page not found'), fatal: true})
}

function rtrim(str: string, char: string) {
    if (!char) {
        return str.trimEnd();
    }
    const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义特殊字符
    const regex = new RegExp(`${escapedChar}+$`);
    return str.replace(regex, '');
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
		<template v-if="!['archive'].includes(page?.layout)">
			<Page :page="page"></Page>
		</template>
		<template v-else-if="['archive'].includes(page?.layout)">
			<Archive></Archive>
		</template>
	</template>
</template>

<style lang="scss" scoped>
</style>
