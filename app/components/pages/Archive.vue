<script lang="ts" setup>
const {t} = useI18n()
const appConfig = useAppConfig()
const {data: tags, refresh} = await useAsyncData(
    'tags',
    async() => {
        return [].concat(
            (await queryCollection('posts')
                    .where('status', '=', 'publish')
                    .all()
            )
                .map(post => post?.tags)
                .flat()
                .filter(tag => !!tag)
                .filter((tag, index, self) => self.indexOf(tag) === index)
        );
    }
)
const computedTags = computed(() => {
    return [t('全部')].concat(tags.value)
})
const route = useRoute()
const currentTag = computed(() => String(route.query?.tag ||route.params?.tag || t('全部')))


const props = defineProps({
    page: {
        type: Object,
        required: false,
    },
});

const page = computed(() => props.page || null);
</script>

<template>
	<ContentRenderer v-if="page" :value="page" class="prose prose-a:hover:text-primary prose-a:no-underline dark:prose-invert"/>
	<div class="flex-1 flex flex-col gap-10">
		<div class="flex flex-wrap gap-2">
			<NuxtLink v-for="(tag,idx) in computedTags" :to="formatLinks(appConfig.links.tags,{tag})" class="!p-0">
				<Tag :severity="currentTag == tag ? null : 'secondary'" :value="tag" class="!py-2 !px-3"></Tag>
			</NuxtLink>
		</div>
		<Posts :tag="currentTag == t('全部') ? null : currentTag"></Posts>
	</div>
</template>

<style scoped>

</style>
