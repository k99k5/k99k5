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
	<h3 class="text-base font-normal text-gray-400 dark:text-gray-500">
		{{ props.title }}
	</h3>
</template>

<style scoped>

</style>
