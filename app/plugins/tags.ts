export default defineNuxtPlugin(() => {
    const router = useRouter()
    const appConfig = useAppConfig()

    if (appConfig.links.tags){
        router.addRoute({
            name: 'tags',
            path: appConfig.links.tags,
            component: () => import('~/app/components/pages/Archive.vue')
        })
    }
})
