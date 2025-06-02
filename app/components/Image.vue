<script setup lang="ts">
const props = defineProps<{
    src: string,
    title: string,
    desc?: string,
    imgAttrs?: Record<string, any>,
    date?: string,
}>();

const open = ref(false);
const rotateAngle = ref(0);
const scaleFactor = ref(1);

const rotate = (deg: number) => {
    rotateAngle.value += deg;
};

const resetRotation = () => {
    rotateAngle.value = 0;
};

const zoomIn = () => {
    scaleFactor.value = Math.min(3, scaleFactor.value + 0.2);
};

const zoomOut = () => {
    scaleFactor.value = Math.max(0.5, scaleFactor.value - 0.2);
};

const handleWheel = (event) => {
  event.preventDefault();
  clearTimeout(wheelTimeout.value);
  wheelTimeout.value = setTimeout(() => {
    event.deltaY < 0 ? zoomIn() : zoomOut();
  }, 10);
};

const wheelTimeout = ref(null);
const resetScale = () => {
    scaleFactor.value = 1;
};

const positionX = ref(0);
const positionY = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault();
  isDragging.value = true;
  startX.value = e.clientX - positionX.value;
  startY.value = e.clientY - positionY.value;
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return;
  positionX.value = e.clientX - startX.value;
  positionY.value = e.clientY - startY.value;
};

const handleMouseUp = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
};

const download = async () => {
    try {
        const response = await fetch(props.src);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = props.src.split('/').pop() || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
    }
};

const resetAll = () => {
    resetRotation();
    resetScale();
    positionX.value = 0;
    positionY.value = 0;
};
</script>

<template>
	
	<UModal v-model:open="open" overlay :title="props.title" :description="props.desc" fullscreen>
		<NuxtPicture
				:src="props.src"
				:alt="props.desc"
				:imgAttrs="props.imgAttrs"
				class="cursor-pointer"
		/>
		<template #body>
			<div class="flex flex-col justify-center items-center h-full w-full">
				<div class="flex justify-center items-center h-full w-full overflow-hidden"
					@wheel="handleWheel"
					@mousedown="handleMouseDown"
					:style="{ cursor: isDragging ? 'grabbing' : 'grab' }">
					<NuxtPicture
						:src="props.src"
						:alt="props.title"
						:img-attrs="{
							...props.imgAttrs,
							class: 'w-auto h-full',
							style: {
								transform: `translate3d(${positionX}px, ${positionY}px, 0) rotate(${rotateAngle}deg) scale(${scaleFactor})`
							}
						}"
						@dragstart.prevent
						class="max-w-full max-h-[80vh] object-contain mb-[80px] flex justify-center items-center w-auto h-full"
					/>
				</div>
				<div class="fixed bottom-8 left-[calc(50%-235px)] flex justify-center gap-4 bg-gray-100/90 dark:bg-gray-900/90 rounded-lg backdrop-blur-sm p-4 w-min">
					<UButton @click="rotate(-90)" icon="i-heroicons-arrow-uturn-left-20-solid"/>
					<UButton @click="zoomOut" icon="i-heroicons-minus-20-solid"/>
					<span class="text-gray-600 dark:text-gray-300 px-2 flex items-center">
						{{
							Math.round(scaleFactor * 100)
						}}%
					</span>
					<UButton @click="zoomIn" icon="i-heroicons-plus-20-solid"/>
					<UButton @click="rotate(90)" icon="i-heroicons-arrow-uturn-right-20-solid"/>
					<UButton @click="resetAll" label="重置"/>
					<UButton @click="download" icon="i-heroicons-arrow-down-tray-20-solid"/>
					<span class="w-max text-gray-600 dark:text-gray-300 px-2 flex items-center">
						{{
							props.date ? props.date : '未知'
						}}
					</span>
				</div>
			</div>
		</template>
	</UModal>
</template>

<style scoped>
img {
  transition: transform 0.3s ease;
}
</style>
