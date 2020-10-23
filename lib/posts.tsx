import fs, { promises as fsPromise } from "fs"
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'

const markdownDir = path.join(process.cwd(), "markdown")

// 本地获取数据
export const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir)
  const results = fileNames.map(fileName => {
    const fullPath = path.join(markdownDir, fileName)
    const id = fileName.replace(/\.md$/g, '')
    const text = fs.readFileSync(fullPath, 'utf-8')
    const { data: { title, date }, content } = matter(text)
    const newDate = String(date)
    return {
      id, title, newDate
    }
  })
  return results
}

export const getPost = async (id: string) => {
  const fullPath = path.join(markdownDir, id + '.md')
  const text = fs.readFileSync(fullPath, 'utf-8')
  const { data: { title, date }, content } = matter(text)
  const newDate = String(date)
  const htmlContent = marked(content)
  return {
    id, title, newDate, content, htmlContent
  }
}

export const getPostIds = async () => {
  const fileNames = await fsPromise.readdir(markdownDir)
  return fileNames.map(fileName => fileName.replace(/\.md$/g, ''))
}