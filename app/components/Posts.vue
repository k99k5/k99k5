<script lang="ts" setup>
import {format} from "date-fns";
import echoConfig from "../../echo.config";
import { tz } from "@date-fns/tz";

const {data: posts} = await useAsyncData(
    'posts',
    () => queryCollection('posts').all()
)


</script>

<template>
	<div class="flex flex-col gap-10">
		<NuxtLink :to="post.path" v-for="post in posts" :key="post.id"
		          class="flex flex-col gap-5 shadow-md transition-all duration-500
		          dark:bg-black/30 dark:hover:bg-gray-800/30
		          hover:bg-gray-300 p-5 rounded-2xl">
			<span class="font-bold">
				{{ post.title }}
			</span>
			<span >
				{{ post.description }}
			</span>
			<Image alt="Image" v-if="post.image">
				<template #previewicon>
					<i class="pi pi-search"></i>
				</template>
				<template #image>
					<NuxtPicture :src="post.image" width="475px" height="auto"/>
				</template>
				<template #preview="slotProps">
					<img :src="post.image" :style="slotProps.style"  :alt="post.title"/>
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
