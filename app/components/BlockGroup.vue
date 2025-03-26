<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";

const {t} = useI18n();

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: () => {
            const {t} = useI18n();
            return t('标题');
        },
    },
    theme: {
        type: String,
        required: false,
        default: 'default',
    },
});

const SCROLL_SPEED = 50; // 像素/秒

// 初始化滚动动画
const initScrollAnimation = () => {
    const cards = document.querySelectorAll('.block-group-container ul > li');

    cards.forEach(card => {
        const descContainer = card.querySelector('ul') as HTMLElement | null;
        const descText = card.querySelector('ul > li') as HTMLElement | null;

        if (!descText || !descContainer || descText.scrollWidth <= descContainer.clientWidth) {
            return;
        }

        descContainer.style.setProperty('--container-width', `${descContainer.clientWidth}px`);

        const scrollDistance = descText.scrollWidth - descContainer.clientWidth;
        const duration = scrollDistance / SCROLL_SPEED;

        card.addEventListener('mouseenter', () => {
            descText.style.animation = `text-scroll ${duration}s linear forwards`;
        });

        card.addEventListener('mouseleave', () => {
            descText.style.animation = 'none';
            requestAnimationFrame(() => {
                descText.style.transform = 'translateX(0)';
            });
        });
    });
};

onMounted(() => {
    initScrollAnimation();
});

// 当插槽内容变化时重新初始化
defineExpose({initScrollAnimation});
</script>

<template>
	<div class="block-group">
		<h3 class="text-base font-normal text-gray-400 dark:text-gray-500">
			{{ props.title }}
		</h3>
		<template v-if="props.theme === 'default'">
			<div class="block-group-container ">
				<slot></slot>
			</div>
		</template>
		<template v-else-if="props.theme === 'none'">
			<slot></slot>
		</template>
	</div>
</template>

<style lang="css" scoped>
@reference "../../assets/css/main.css";

/* 基础样式 */
.block-group ::v-deep(.block-group-container) > ul {
    @apply grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 p-0 list-none;
}

.block-group ::v-deep(.block-group-container) > ul > li {
    @apply border border-gray-200 dark:border-gray-200/21 rounded-lg p-4 transition-all duration-300 font-bold;

}

.block-group ::v-deep(.block-group-container) > ul > li:hover {
    @apply -translate-y-1 shadow-lg;
}

.block-group ::v-deep(.block-group-container) > ul > li > ul {
    @apply m-0 p-0 list-none overflow-hidden;
}

.block-group ::v-deep(.block-group-container) > ul > li > ul > li {
    @apply whitespace-nowrap inline-block relative will-change-transform text-gray-600 dark:text-gray-400 font-normal pt-1 p-0 m-0;
    animation-name: text-scroll !important;
}

/* 动画关键帧 */
@keyframes text-scroll{
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(-100% + var(--container-width)));
    }
}
</style>
