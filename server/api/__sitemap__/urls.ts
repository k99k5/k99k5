import {asSitemapUrl, defineSitemapEventHandler} from '#imports'

export default defineSitemapEventHandler(async (e) => {
    const items: any[] = (await (queryCollection(e, 'posts').all())).concat(await (queryCollection(e, 'pages').all()))
    return items
        .map((c) => {
            return asSitemapUrl({
                loc: c.path,
                lastmod: (c?.updated_date ? new Date(Date.parse(c?.updated_date as string)) : new Date()).toISOString(),
            })
        })
})
