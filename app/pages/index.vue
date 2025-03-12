<script lang="ts" setup>
import type {BlogPost} from '~/types'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const {data: page} = await useAsyncData('blog', () => queryContent('/blog').findOne())
if (!page.value) {
    throw createError({statusCode: 404, statusMessage: t('Page not found'), fatal: true})
}

const {data: posts} = await useAsyncData('posts', () => queryContent<BlogPost>('/blog')
    .where({_extension: 'md'})
    .sort({date: -1})
    .find())

useSeoMeta({
    title: page.value.title,
    ogTitle: page.value.title,
    description: page.value.description,
    ogDescription: page.value.description
})

defineOgImageComponent('Saas')
</script>

<template>
	<UContainer>
		<UPageHeader
				class="py-[50px]"
				v-bind="page"
		/>
		
		<UPageBody>
			<UBlogList>
				<UBlogPost
						v-for="(post, index) in posts"
						:key="index"
						:authors="post.authors"
						:badge="post.badge"
						:class="[index === 0 && 'col-span-full']"
						:date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
						:description="post.description"
						:image="post.image"
						:orientation="index === 0 ? 'horizontal' : 'vertical'"
						:title="post.title"
						:to="post._path"
						:ui="{
            description: 'line-clamp-2'
          }"
				/>
			</UBlogList>
		</UPageBody>
	</UContainer>
</template>