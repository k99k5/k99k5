<script lang="ts" setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n()

const props = defineProps({
    theme: {
        type: String,
        required: false,
        default: 'default',
    },
})
</script>

<template>
	<div class="border border-gray-200 dark:border-gray-200/21 rounded-lg p-4">
		<slot></slot>
	</div>
</template>

<style scoped>
</style>
