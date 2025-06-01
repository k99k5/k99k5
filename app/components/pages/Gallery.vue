<script setup lang="ts">
const {t} = useI18n()

type GalleryItem = {
    name: string
    thumbnail: string
    isDir?: boolean
    date?: string
    children?: GalleryItem[]
}
const {data: images} = await useAsyncData('galleryData', () =>
    $fetch('/api/gallery.json')
)

const galleryItems = computed<GalleryItem[]>(() => {

    const structure = {}

    images.value.forEach(image => {
        const cleanPath = image.url;
        const parts = image.url.split('/').slice(2)

        if (parts.length > 1) {
            const [folder, ...rest] = parts
            structure[folder] = structure[folder] || {
                name: folder,
                isDir: true,
                children: []
            }
            structure[folder].children.push({
                name: rest.join('/').replace(/\.\w+$/, ''),
                thumbnail: cleanPath,
                date: new Date(image.mtime).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            })
        } else {
            structure[parts[0]] = {
                name: parts[0].replace(/\.\w+$/, ''),
                thumbnail: cleanPath,
                date: new Date(image.mtime).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            }
        }
    })

    return Object.values(structure)
})
</script>


<template>
	<div class="space-y-10 max-w-4xl mx-auto px-4">
		<template v-for="item in galleryItems" :key="item.name">
			<!-- 合集 -->
			<div v-if="item.isDir" class="space-y-3">
				<h2 class="text-base font-semibold text-gray-600 tracking-wide px-1">
					{{ item.name }}
				</h2>
				<div class="columns-2 gap-4 space-y-4">
					<div
							v-for="child in item.children"
							:key="child.name"
							class="break-inside-avoid flex flex-col items-center"
					>
						<Image
								:src="child.thumbnail"
								:title="child.name"
								:desc="item.name"
								:date="child.date"
								:imgAttrs="{class: 'rounded-2xl shadow-md hover:shadow-lg transition w-full object-cover'}"
						/>
						<p class="mt-2 text-sm text-gray-600 text-center truncate w-full">
							{{ child.name }}
						</p>
					</div>
				</div>
			</div>
			
			<!-- 单图 -->
			<div v-else class="flex flex-col items-center space-y-2">
				<Image
						:src="item.thumbnail"
						:title="item.name"
						:date="item.date"
						:imgAttrs="{class: 'rounded-2xl shadow-md hover:shadow-lg transition w-full object-cover'}"
				/>
				<p class="text-sm text-gray-700 text-center truncate w-full">
					{{ item.name }}
				</p>
			</div>
		</template>
	</div>
</template>

<style scoped>
</style>
