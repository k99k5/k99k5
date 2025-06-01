import fs from 'fs'
import path from 'path'
import type {H3Event} from 'h3'

type ImageMetadata = {
    url: string
    filename: string
    mtime: string
    size: number
}

export default defineEventHandler(async (event: H3Event) => {
    const galleryDir = path.join(process.cwd(), 'public/gallery')
    const result: ImageMetadata[] = [];

    // 递归扫描目录函数
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


                    result.push({
                        url: publicPath,
                        filename: entry.name,
                        mtime: stats.mtime.toISOString(),
                        size: stats.size,
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
    result.sort((a, b) =>
        new Date(b.mtime).getTime() - new Date(a.mtime).getTime()
    )

    return result
})
