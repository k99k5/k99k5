export default defineNitroPlugin((nitroApp) => {
    console.log('loading plugin...');
    //@ts-ignore
    nitroApp.hooks.hook('content:file:afterParse',  (ctx: FileAfterParseHook) => {
        ctx.content.path = (ctx.content.path as string).replace(/__posts/, '');
    });
})
