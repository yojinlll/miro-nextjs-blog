import { useEffect } from "react"
import { User } from "src/entity/User";
import { Post } from "src/entity/Post";
import Router from 'next/router'

export const useRedirect = (user: User, post: Post | true = true) => {
  useEffect(() => {
    !user && Router.push(`/sign_in?returnTo=${window.location.pathname}`)
    !post && Router.push('/404')
  }, [])

  return
}