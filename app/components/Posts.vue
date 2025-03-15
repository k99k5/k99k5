<script lang="ts" setup>
const {data: posts} = await useAsyncData(
    'posts',
    () => queryCollection('posts').all()
)


</script>

<template>
	<div class="flex flex-col gap-10">
		<NuxtLink :to="post.path" v-for="post in posts" :key="post.id" class="flex flex-col gap-5 border-1 border-gray-100 shadow-md dark:hover:bg-black hover:bg-gray-100  transition-all p-5 rounded-2xl">
			<span class="font-bold">
				{{ post.title }}
			</span>
			<span>
				{{ post.description }}
			</span>
			<Image alt="Image">
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
			<div>
				{{ post.date }}
			</div>
		</NuxtLink>
	</div>
</template>

<style scoped>

</style>
