import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = (props) => {
  return (
    <>
      <div className="cover">
        <img src="/logo.svg" />
        <h1>Jin blog</h1>
        <p>
          <Link href="/posts"><a>blog list</a></Link>
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