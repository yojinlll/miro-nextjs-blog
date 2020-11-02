import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { Button } from "components"
import { User } from "src/entity/User";

type Props = {
  currentUser: User
}

const Home: NextPage<Props> = (props) => {
  const { currentUser } = props

  return (
    <>
      <div className="cover">
        <h1>Mironote</h1>
        {
          currentUser
            ? <>
              <h2>Hello, {currentUser.username}</h2>
              <Link href="/posts"><a><Button>Start</Button></a></Link>
            </>
            : <Link href="/sign_in"><a><Button>登录 / 注册</Button></a></Link>
        }
      </div>

      <style jsx>{`
        .cover{
          min-height: 60vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        h1{
          font-size: 60px;
          font-weight: 400;
          margin-bottom: 12px;
        }
        h2{
          font-weight: 400;
          font-family: Cardo,serif;
        }
      `}</style>
      <style jsx global>{`
        .cover .miro-button{
          border: 1px solid #c39c5a;
          padding-left: 3.75rem;
          padding-right: 3.75rem;
          font-family: Cardo,serif;
        }
        .cover .miro-button:hover,
        .cover .miro-button:focus{
          border-color: #c39c5a;
          outline: 0;
          box-shadow: 0 0 6px 2px #c39c5a42;
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