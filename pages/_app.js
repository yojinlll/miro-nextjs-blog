import Head from 'next/head'
import '../styles/globals.scss'
import "github-markdown-css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>blog</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
