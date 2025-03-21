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
					:to="item.path"
					class="text-normal"
					:class="{
						'text-primary': route.path === item.path,
						'text-gray-500': route.path !== item.path,
						'hover:text-primary-500': route.path !== item.path,
					}"
				>
					{{ item.title }}
				</NuxtLink>
			</li>
			<li class="flex justify-center ml-5">
				<ClientOnly>
					<ToggleSwitch v-model="colorMode.preference" class=""
					              false-value="light"
					              true-value="dark">
						<template #handle="{ checked }">
							<Icon v-if="!checked" name="heroicons:sun"/>
						</template>
					</ToggleSwitch>
					<template #fallback>
						<ToggleSwitch>
							<Icon name="heroicons:sun"/>
						</ToggleSwitch>
					</template>
				</ClientOnly>
			</li>
		</ul>
	</nav>
</template>
