import Head from "next/head"
import React from "react"

type LayourProps = {
  children: React.ReactElement
}

const Layout = ({ children }: LayourProps) => {
  return (
    <div className="mx-auto max-w-5xl px-6 pt-8">
      <Head>
        <title>EPUBer APP</title>
        <meta name="description" content="Batch converting PDFs to EPUBs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center justify-between">
        <div className="font-mono text-3xl font-bold text-gray-800">EPUBer</div>
      </header>

      <main className="py-8">
        <div>
          <h1 className="pb-4 text-2xl font-bold text-gray-800">
            Files Upload
          </h1>
          <h2 className="font-mono text-lg text-gray-700">
            Convert PDFs to EPUBs
          </h2>
          <div className="my-6">{children}</div>
        </div>
      </main>

      <footer className="my-8 text-center text-sm text-gray-600">
        <a href="https://github.com/TunkShif/EPUBer">open source</a>
      </footer>
    </div>
  )
}

export default Layout
