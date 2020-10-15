import { useEffect, useState } from "react"
import axios from "axios"

// ajax 获取数据
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get("/api/v1/posts").then(res => {
      setTimeout(()=>{
        setIsLoading(false)
        setPosts(res.data)
        setIsEmpty(!res.data.length)
      }, 2000)
    }).catch(err => {
      setIsLoading(false)
    })
  }, [])

  return {posts, isLoading, isEmpty}
}