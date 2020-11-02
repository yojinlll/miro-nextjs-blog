import Head from 'next/head'
import '../styles/globals.scss'
import "github-markdown-css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mironote</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Cardo&display=swap" rel="stylesheet"></link>
      </Head>
      <div className="wrapper">
        <div className="wrapper-header"></div>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
