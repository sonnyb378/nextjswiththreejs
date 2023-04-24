
import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Layout from "../components/Layout"


function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        document.body.className = "flex flex-col relative bg-black text-slate-100 border-0 border-violet-500";
        document.body.style.width = "100%"
        document.body.style.height = "100%"
      }, []);
      
  return (
    <>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </>
  )
}

export default MyApp