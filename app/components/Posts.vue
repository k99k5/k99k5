<script lang="ts" setup>
import {format} from "date-fns";
import echoConfig from "../../echo.config";
import {tz} from "@date-fns/tz";
import {computedAsync} from "@vueuse/core";

const props = defineProps({
    tag: {
        type: String,
        required: false,
    },
	limit: {
		type: Number,
		required: false,
	},
})

const {data: posts, refresh} = await useAsyncData(
    'posts',
    () => {
        let query = queryCollection('posts')
            .where('status', '=', 'publish');
        
        if (props.tag){
            query = query.where('tags', 'LIKE', `%${props.tag}%`)
        }
        
        if (props.limit){
            query = query.limit(props.limit)
        }
	    
        return query
            .order('priority', 'ASC')
	        .order('date', 'DESC')
	        .all();
    }
    
)

watch(() => props, () => refresh(), {deep: true})
</script>

<template>
	<div class="flex flex-col gap-10">
		<NuxtLink v-for="post in posts" :key="post.id" :to="post.path"
		          class="flex flex-col gap-5 shadow-md transition-all duration-500
		          dark:bg-black/30 dark:hover:bg-gray-800/30
		          hover:bg-gray-300 p-5 rounded-2xl">
			<span class="font-bold">
				{{ post.title }}
			</span>
			<span>
				{{ post.description }}
			</span>
			<Image v-if="post.image" :src="post.image" alt="Image" class="rounded-2xl overflow-hidden" height="auto"
			       width="475px">
				<template #previewicon>
					<i></i>
				</template>
				<template #preview="slotProps">
					<img :alt="post.title" :src="post.image" :style="slotProps.style"/>
				</template>
			</Image>
			<div class="text-gray-400">
				<ClientOnly>
					{{
						format(new Date(post.date), 'yyyy-MM-dd')
					}}
					<template #fallback>
						{{
							format(new Date(post.date), 'yyyy-MM-dd', {
								in: tz(echoConfig.defaultTimeZone),
							})
						}}
					</template>
				</ClientOnly>
			</div>
		</NuxtLink>
	</div>
</template>

<style scoped>

</style>
