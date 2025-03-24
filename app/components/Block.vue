<script lang="ts" setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n()

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: () => {
            const {t} = useI18n();
            return t('标题')
        },
    },
    theme: {
        type: String,
        required: false,
        default: 'default',
    },
})
</script>

<template>
	<div>
		<h3 class="text-base font-normal text-gray-400 dark:text-gray-500">
			{{ props.title }}
		</h3>
		<template v-if="props.theme === 'default'">
			<div class="border border-gray-200 dark:border-gray-200/21 rounded-lg p-4">
				<slot></slot>
			</div>
		</template>
		<template v-else-if="props.theme === 'none'">
			<slot></slot>
		</template>
	</div>
</template>

<style scoped>
</style>
