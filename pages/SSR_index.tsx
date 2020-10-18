import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next'
// import Link from 'next/link'
import { UAParser } from "ua-parser-js";

type Props = {
  browser: {
    major: string
    name: string
    version:  string
  }
}

const SSRIndex: NextPage<Props> = (props) => {
  console.log(props.browser);
  
  return (
    <div>
      <h1>SSR test</h1>

      <h2>你的浏览器是 { JSON.stringify(props.browser) }</h2>
    </div>
  )
}

export default SSRIndex

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  console.log('connection');
  

  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()
  return {
    props: {
      browser: result.browser
    }
  }
}