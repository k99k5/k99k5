<script lang="ts" setup>
const {t} = useI18n()
const tags = [t('全部')].concat(
    (await queryCollection('posts')
            .where('status', '=', 'publish')
            .all()
    )
    .map(post => post?.tags)
    .flat()
    .filter((tag, index, self) => self.indexOf(tag) === index)
)
</script>

<template>
	<div class="flex flex-wrap gap-2">
		<NuxtLink v-for="tag in tags" :to="{query:{tags: tag}}" class="!p-0">
			<Tag :severity="'secondary'" :value="tag" class="!py-2 !px-3"></Tag>
		</NuxtLink>
	</div>
	<Posts></Posts>
</template>

<style scoped>

</style>
