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
					<USwitch size="xl"
					         class="w-10 h-6"
					         unchecked-icon="heroicons:sun"
					         checked-icon="heroicons:light-bulb"
					         @change="colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'"
					         :checked="colorMode.preference === 'dark'"
					/>
					<template #fallback>
						<USwitch size="xl"
						         class="w-10 h-6"
						         unchecked-icon="heroicons:sun"
						         checked-icon="heroicons:light-bulb"
						         :checked="false"
						/>
					</template>
				</ClientOnly>
			</li>
		</ul>
	</nav>
</template>
