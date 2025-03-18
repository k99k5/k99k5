<script lang="ts" setup>
const appConfig = useAppConfig();
const route = useRoute();
const {t} = useI18n();

function loadScript() {
    if (import.meta.env.SSR) {
        return;
    }
    if (document.getElementById('busuanzi')) {
        document.getElementById('busuanzi').remove();
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.id = 'busuanzi';
        script.src = appConfig.libs.bsz.src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            reject();
        };
        document.body.appendChild(script);
    });
}

onMounted(() => loadScript());
watch(() => route.fullPath, () => loadScript(), {immediate: true})
</script>

<template>
	<div v-if="appConfig.libs.bsz.enable" class="text-sm text-gray-500 flex gap-3">
		<div id="busuanzi_container_site_pv" style="display:none">
			{{ t('访问量') }}
			<span id="busuanzi_value_site_pv"></span>
		</div>
		<div id="busuanzi_container_site_uv" style="display:none">
			{{ t('访客数') }}
			<span id="busuanzi_value_site_uv"></span>
		</div>
	</div>
</template>

<style scoped>

</style>
