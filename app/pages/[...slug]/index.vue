<script lang="ts" setup>
import {useI18n} from 'vue-i18n'
import Archive from "~/app/components/pages/Archive.vue";
import Page from "~/app/components/pages/Page.vue";
import Gallery from "~/app/components/pages/Gallery.vue";

const {t} = useI18n()
const route = useRoute()

const cleanPath = (path: string) =>
    decodeURIComponent(path).replace(/\/+$/, "").toLowerCase();

const {data: page} = await useAsyncData(
    route.path,
    async () => {
        const targetPath = cleanPath(route.path);
        let page = await queryCollection('pages')
            .where('status', '=', 'publish')
            .path(targetPath)
            .first();
        if (!page) {
            page = await queryCollection('posts')
                .where('status', '=', 'publish')
                .path(targetPath)
                .first();
        }
        return page;
    }
);

if (!page.value) {
    throw createError({statusCode: 404, statusMessage: t('页面不存在'), fatal: true})
}

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description
})

defineOgImageComponent('SimpleBlog')
</script>

<template>
	<template v-if="page">
		<template v-if="['gallery'].includes(page?.layout)">
			<Gallery :page="page"></Gallery>
		</template>
		<template v-else-if="!['archive'].includes(page?.layout)">
			<Page :page="page"></Page>
		</template>
		<template v-else-if="['archive'].includes(page?.layout)">
			<Archive :page="page"></Archive>
		</template>
	</template>
</template>

<style lang="scss" scoped>
</style>
