import {defineCollection, defineContentConfig, z} from '@nuxt/content'

export default defineContentConfig({
    collections: {
        posts: defineCollection({
            // Load every file inside the `content` directory
            source: '__posts/**',
            // Specify the type of content in this collection
            type: 'page',
            // Define the schema for each file
            schema: z.object({
                created_date: z.string(),
                updated_date: z.string(),
            })
        }),
        pages: defineCollection({
            // Load every file inside the `content` directory
            source: {
                include: '**',
                exclude: ['**/__posts/**'],
            },
            // Specify the type of content in this collection
            type: 'page',
            // Define the schema for each file
            schema: z.object({
                created_date: z.string(),
                updated_date: z.string(),
            })
        })
    }
})
