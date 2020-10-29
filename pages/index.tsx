import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { User } from "src/entity/User";
import { useRouter } from 'next/router'

type Props = {
  currentUser: User
}

const Home: NextPage<Props> = (props) => {
  const router = useRouter()
  const { currentUser } = props
  useEffect(() => {
    currentUser && router.push('/posts')
  }, [currentUser])

  return (
    <>
      <div className="cover">
        <img src="/logo.svg" />
        <h1>Mironote</h1>
        <p>
          <Link href="/sign_in"><a>注册/登录</a></Link>
        </p>
      </div>

      <style jsx>{`
        .cover{
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  // @ts-ignore
  const currentUser = JSON.parse(context.req.session.get('currentUser') || null)

  return {
    props: {
      currentUser
    }
  }
})