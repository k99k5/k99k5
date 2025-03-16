<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import {format} from "date-fns";
import {tz} from "@date-fns/tz";
import echoConfig from "~/echo.config";

const {t} = useI18n()
const route = useRoute()

const {data: page} = await useAsyncData(
    'archive',
    async () => {
        let page = await queryCollection('pages')
            .where('status', '=', 'publish')
            .orWhere(query => query
                .where('path', '=', decodeURIComponent(route.path))
                .where('path', '=', route.path)
            )
            .first();
        if (!page) {
            page = await queryCollection('posts')
                .where('status', '=', 'publish')
                .orWhere(query => query
                    .where('path', '=', decodeURIComponent(route.path))
                    .where('path', '=', route.path)
                )
                .first();
        }
        return page;
    }
);

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
		<template v-if="!['archive'].includes(page?.layout)">
			<Page :page="page"></Page>
		</template>
		<Posts v-else-if="['archive'].includes(page?.layout)"></Posts>
	</template>
</template>

<style lang="scss" scoped>
</style>
