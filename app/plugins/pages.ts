import Page from "~/app/pages/[...slug].vue";
export default defineNuxtPlugin(() => {
    const router = useRouter()
    router.addRoute({
        path: '/:slug/',
        component: Page
    })
})
