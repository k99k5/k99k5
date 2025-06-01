<template>
    <div class="h-full flex-1 mx-auto px-4 text-center flex flex-col justify-center items-center">
	    <UTooltip :delay-duration="0" :text="props?.message">
		    <h1 class="text-4xl font-bold mb-6">{{ t('Oops，页面不见了') }}</h1>
	    </UTooltip>
	    <p v-html="t('🤔 你可以看看热门文章\n或者搜索其他内容？').replace(/\n/g, '<br>')" class="mb-8 text-gray-600"></p>
        <UButton @click="emit('handleError')" color="primary"
            class="px-6 py-3 transition-colors">
            {{ t('返回首页') }}
        </UButton>
    </div>
</template>

<script lang="ts" setup>
import UTooltip from '@nuxt/ui/components/Tooltip.vue'

const { t } = useI18n()
const emit = defineEmits(['handleError'])
const props = defineProps<{
    message?: string
}>()
</script>
