import echoConfig from "@/echo.config";

export default defineAppConfig({
    ...echoConfig,
    appId: echoConfig.siteName,
})
