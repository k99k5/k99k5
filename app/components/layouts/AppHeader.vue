<script lang="ts" setup>
import type {ContentNavigationItem} from "@nuxt/content";

const colorMode = useColorMode()
const appConfig = useAppConfig()
const navigation = inject<ContentNavigationItem[]>('navigation')
const route = useRoute();
//@click =>colorMode.preference = 'light'
</script>

<template>
	<nav class="flex items-center justify-between gap-5">
		<NuxtLink to="/">
			<NuxtImg :src="appConfig.siteIcon" class="rounded-full" height="50px" width="50px"/>
		</NuxtLink>
		<ul class="flex-1 flex justify-end items-center gap-5">
			<li v-for="item in navigation" class="flex justify-center">
				<NuxtLink
						:class="{
						'text-primary': route.path === item.path,
						'text-gray-500': route.path !== item.path,
						'hover:text-primary-500': route.path !== item.path,
					}"
						:to="item.path"
						class="text-normal"
				>
					{{ item.title }}
				</NuxtLink>
			</li>
			<li class="flex justify-center ml-5">
				<ClientOnly>
					<UButton v-if="colorMode.preference === 'dark'"
					         color="neutral"
					         icon="i-ph-moon" variant="ghost" @click="colorMode.preference = 'light'"/>
					<UButton v-else
					         color="neutral"
					         icon="i-ph-sun" variant="ghost"
					         @click="colorMode.preference = 'dark'"/>
					<template #fallback>
						<UButton color="neutral" loading variant="ghost"/>
					</template>
				</ClientOnly>
			</li>
		</ul>
	</nav>
</template>
