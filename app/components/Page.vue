<script lang="ts" setup>
import {format} from "date-fns";
import {tz} from "@date-fns/tz";
import echoConfig from "~/echo.config";

const props = defineProps({
    page: {
        type: Object,
        required: true,
    },
});

const page = computed(() => props.page);
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<template v-if="!['page'].includes(page.layout)">
				<h1 class="text-xl font-bold">{{ page.title }}</h1>
				<p class="text-gray-500 dark:text-gray-400">
					<ClientOnly>
						{{
							format(new Date(page.date), 'yyyy-MM-dd')
						}}
						<template #fallback>
							{{
								format(new Date(page.date), 'yyyy-MM-dd', {
									in: tz(echoConfig.defaultTimeZone),
								})
							}}
						</template>
					</ClientOnly>
				</p>
			</template>
			<Image v-if="page.image" :src="page.image" alt="Image" class="rounded-2xl overflow-hidden mt-5"
			       image-class="rounded-2xl" preview>
				<template #previewicon>
					<Icon name="heroicons:magnifying-glass"/>
				</template>
				<template #preview="slotProps">
					<img :alt="page.title" :src="page.image" :style="slotProps.style"/>
				</template>
			</Image>
		</div>
	</div>
	<ContentRenderer :value="page" class="prose prose-a:hover:text-primary prose-a:no-underline dark:prose-invert my-5"/>
	<Tags :tags="page.tags ?? []"></Tags>
</template>

<style lang="scss" scoped>

</style>
