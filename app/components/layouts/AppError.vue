<template>
    <div class="h-full flex-1 mx-auto px-4 text-center flex flex-col justify-center items-center">
        <h1 class="text-4xl font-bold mb-6">{{ t('Oops，页面不见了') }}</h1>
        <p v-tooltip.bottom="props?.message" v-html="t('🤔 你可以看看热门文章\n或者搜索其他内容？').replace(/\n/g, '<br>')" class="mb-8 text-gray-600"></p>
        <Button @click="emit('handleError')"
            class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            {{ t('返回首页') }}
        </Button>
    </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const emit = defineEmits(['handleError'])
const props = defineProps<{
    message?: string
}>()
</script>
