<script lang="ts" setup>
const {t} = useI18n()
const tags = [t('全部')].concat(
    (await queryCollection('posts')
            .where('status', '=', 'publish')
            .all()
    )
    .map(post => post?.tags)
    .flat()
	.filter(tag => !!tag)
    .filter((tag, index, self) => self.indexOf(tag) === index)
)
const route = useRoute()
const currentTag = computed(() => String(route.query?.tag || t('全部')))


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
			<NuxtLink v-for="tag in tags" :to="{query:{tag: tag}}" class="!p-0">
				<Tag :severity="currentTag == tag ? null : 'secondary'" :value="tag" class="!py-2 !px-3"></Tag>
			</NuxtLink>
		</div>
		<Posts :tag="currentTag == t('全部') ? null : currentTag"></Posts>
	</div>
</template>

<style scoped>

</style>
