import {asSitemapUrl, defineSitemapEventHandler} from '#imports'

export default defineSitemapEventHandler(async (e) => {
    // Fetch all documents
    const contentList = await queryCollection(e, 'posts').all();

    return contentList
        .map((c) => {
            return asSitemapUrl({
                loc: c.path,
                lastmod: (c?.meta?.date ? new Date(Date.parse(c?.meta?.date as string)) : new Date()).toISOString(),
            })
        })
})
