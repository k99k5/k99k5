<script setup lang="ts">
const appConfig = useAppConfig();

const props = defineProps({
    tags: {
        required: false,
        default: () => null,
    },
})

const {data: computedTags, refresh} = await useAsyncData(
    props.tags ? JSON.stringify(props.tags) : 'tags',
    async () => {
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
</script>

<template>
	<div class="flex flex-wrap gap-2 not-prose">
		<NuxtLink v-for="(tag,idx) in computedTags" :to="formatLinks(appConfig.links.tags,{tag})">
			<UBadge v-if="tag"
			        :color="(['secondary','success','warning','neutral'][idx % 4] as ('secondary'|'success'|'warning'|'neutral'))"
			        variant="soft"
			        class="!py-2 !px-3">
				{{ tag }}
			</UBadge>
		</NuxtLink>
	</div>
</template>

<style scoped>

</style>
