<script setup>
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')
const appConfig = useAppConfig()


useHead({
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { key: 'theme-color', name: 'theme-color', content: color }
    ],
    link: [
        { rel: 'icon', href: appConfig.siteIcon }
    ],
    htmlAttrs: {
        lang: appConfig.siteLang || 'zh-CN'
    }
})

useSeoMeta({
    titleTemplate: '%s - ' + appConfig.siteName,
    twitterCard: 'summary_large_image'
})
</script>

<template>
	<UApp>
		<NuxtLoadingIndicator/>
		<NuxtLayout>
			<NuxtPage/>
		</NuxtLayout>
	</UApp>
</template>
