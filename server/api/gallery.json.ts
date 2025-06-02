import fs from 'fs'
import path from 'path'
import type {H3Event} from 'h3'
// @ts-ignore
import {parse} from 'exifr/dist/full.esm.mjs'

type ImageMetadata = {
    url: string
    filename: string
    mtime: string
    size: number
    depth: number
}

export default defineEventHandler(async (event: H3Event) => {
    const galleryDir = path.join(process.cwd(), 'public/gallery')
    const result: ImageMetadata[] = [];

    const scanDir = async (dir: string) => {
        const entries = fs.readdirSync(dir, {withFileTypes: true})

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)

            if (entry.isDirectory()) {
                await scanDir(fullPath)
            } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
                try {
                    const stats = fs.statSync(fullPath)

                    const publicPath = fullPath
                        .replace(path.resolve('public'), '')
                        .replace(process.cwd(), '')
                        .replace(/\\/g, '/')

                    const exif = await parse(fullPath).catch(() => null)
                    const captureTime = exif?.DateTimeOriginal?.toISOString() || stats.mtime.toISOString()

                    result.push({
                        url: publicPath,
                        filename: entry.name,
                        mtime: captureTime,
                        size: stats.size,
                        depth: (publicPath.match(/\//g) || []).length - 1
                    })
                } catch (err) {
                    console.error(`处理图片出错: ${fullPath}`, err)
                }
            }
        }
    }

    // 开始扫描目录
    await scanDir(galleryDir)

    // 按修改时间排序（最新在前）
    result.sort((a, b) => {
        if (a.depth !== b.depth) {
            return a.depth - b.depth
        }
        return new Date(b.mtime).getTime() - new Date(a.mtime).getTime()
    })

    return result
})
