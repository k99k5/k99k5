<script setup lang="ts">
const appConfig = useAppConfig();

const props = defineProps({
    tags: {
        required: false,
        default: () => null,
    },
})

const allTags = [].concat(
    (await queryCollection('posts')
            .where('status', '=', 'publish')
            .all()
    )
        .map(post => post?.tags)
        .flat()
        .filter(tag => !!tag)
        .filter((tag, index, self) => self.indexOf(tag) === index)
)

const computedTags = computed(() => {
    if (props.tags) {
        return props.tags
    }
    return allTags
})
</script>

<template>
	<div class="flex flex-wrap gap-2 not-prose">
		<NuxtLink v-for="(tag,idx) in computedTags" :to="formatLinks(appConfig.links.tags,{tag})">
			<Tag v-if="tag" :severity="['secondary','success','info'][idx % 3]" :value="tag" class="!py-2 !px-3"></Tag>
		</NuxtLink>
	</div>
</template>

<style scoped>

</style>
