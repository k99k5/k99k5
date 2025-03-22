<script setup lang="ts">
import {computedAsync} from "@vueuse/core";

const props = defineProps({
	tags: {
		required: false,
		default: () => null,
	},
})

const computedTags = computedAsync(async () => {
    if (props.tags) {
        return props.tags;
    }
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
})
</script>

<template>
	<div class="flex flex-wrap gap-2 not-prose">
		<Tag v-for="(tag,idx) in computedTags" :severity="['secondary','success','info'][idx % 3]" :value="tag" class="!py-2 !px-3"></Tag>
	</div>
</template>

<style scoped>

</style>
