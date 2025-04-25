<script lang="ts" setup>
import {format} from "date-fns";
import echoConfig from "./../../echo.config";
import {tz} from "@date-fns/tz";
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const props = defineProps({
    tag: {
        required: false,
    },
    limit: {
        type: Number,
        required: false,
    },
    theme: {
        type: String,
        required: false,
        default: 'default',
    }
})

const fetchKey = computed(() => {
	return `data-${props.tag || 'all'}-${props.limit || 'default'}-${props.theme}`
})

const {data: posts, refresh} = await useAsyncData(
	fetchKey,
    async () => {
        let query = queryCollection('posts')
            .where('status', '=', 'publish');

        if (props.tag) {
            query = query.where('tags', 'LIKE', `%${props.tag}%`)
        }

        if (props.limit) {
            query = query.limit(props.limit)
        } else {
            query = query.order('priority', 'ASC')
        }

        return await query
            .order('date', 'DESC')
            .all();
    },
	{
		watch: [props]
	}
)
</script>

<template>
	<div class="flex flex-col gap-10 not-prose">
		<template v-if="props.theme === 'default'">
			<NuxtLink v-for="post in posts" :key="post.id" :to="post.path"
			          class="flex flex-col gap-5 shadow-md transition-all duration-500
					          dark:bg-black/30 dark:hover:bg-gray-800/30
					          hover:bg-gray-300 p-5 rounded-2xl"
			>
				<div class="font-bold">
					{{ post.title }}
				</div>
				<div>
					{{ post.description }}
				</div>
				<NuxtImg v-if="post.image" :src="post.image" alt="Image" class="mt-3 rounded-2xl overflow-hidden"
				         height="auto" width="475px">
				</NuxtImg>
				<div class="text-gray-400">
					<ClientOnly>
						{{
							format(new Date(post.date), 'yyyy-MM-dd')
						}}
						<template #fallback>
							{{
								format(new Date(post.date), 'yyyy-MM-dd', {
									in: tz(echoConfig.defaultTimeZone),
								})
							}}
						</template>
					</ClientOnly>
				</div>
			</NuxtLink>
		</template>
		<template v-if="props.theme === 'style1'">
			<UCard v-for="post in posts" :key="post.id" :header="post.title" :to="post.path"
			       class="flex flex-col transition-all duration-500 p-3 rounded-2xl !bg-[inherit] hover:-translate-y-1 hover:shadow-lg"
			>
				<div class="flex flex-col">
					<div class="font-bold">
						{{ post.title }}
					</div>
					<div class="text-gray-400">
						<ClientOnly>
							{{
								format(new Date(post.date), 'yyyy-MM-dd')
							}}
							<template #fallback>
								{{
									format(new Date(post.date), 'yyyy-MM-dd', {
										in: tz(echoConfig.defaultTimeZone),
									})
								}}
							</template>
						</ClientOnly>
					</div>
				</div>
				<div class="flex flex-col gap-5">
					<NuxtImg v-if="post.image" :src="post.image" alt="Image" class="mt-3 rounded-2xl overflow-hidden"
					         height="auto" width="475px">
					</NuxtImg>
					<div class="flex flex-wrap justify-between w-full">
						<span>{{ post.description }}</span>
						<NuxtLink :to="post.path" class="hover:text-primary flex items-center gap-2">
							<span>{{ t('继续阅读') }}</span>
							<Icon name="heroicons:arrow-right"/>
						</NuxtLink>
					</div>
				</div>
			</UCard>
		</template>
	</div>
</template>

<style scoped>

</style>
