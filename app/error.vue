<script lang="ts" setup>
const { t } = useI18n()
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const appConfig = useAppConfig()

useHead({
    title: `${t('Oops，页面不见了')} - ${appConfig.siteName}`,
})


const handleError = () => clearError({ redirect: '/' })

useSeoMeta({
    titleTemplate: `%s - ${appConfig.siteName}`,
    title: t('Oops，页面不见了'),
    description: t('🤔 你可以看看热门文章\n或者搜索其他内容？'),

    ogTitle: t('Oops，页面不见了'),
    ogDescription: t('🤔 你可以看看热门文章\n或者搜索其他内容？'),

    ogSiteName: appConfig.siteName,
})
</script>

<template>
    <div>
        <NuxtLoadingIndicator />
        <NuxtLayout name="default">
            <AppError :message="props.error?.message" @handleError="handleError" />
        </NuxtLayout>
    </div>

</template>

<style scoped></style>
