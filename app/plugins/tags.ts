import Archive from "~/app/components/pages/Archive.vue";
export default defineNuxtPlugin(() => {
    const router = useRouter()
    const appConfig = useAppConfig()

    if (appConfig.links.tags){
        router.addRoute({
            name: 'tags',
            path: appConfig.links.tags,
            component: Archive
        })
    }
})
