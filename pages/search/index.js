import { Layout } from 'components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { search } from 'services/search'

export default function Index({ query, results }) {
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Searc results for ${query}`} />
      </Head>
      <Layout>
        <h1>Resultados para {query}</h1>
        {results.map(result => (
          <Link
            key={result.id}
            href={`/comic/${result.id}`}
            className="flex content-center justify-start gap-2 p-2 m-2 transition-colors rounded-lg bg-neutral-200 hover:bg-neutral-100"
          >
            <Image
              src={result.img}
              alt={result.alt}
              height="50"
              width="50"
              className="rounded-lg"
            />
            <div>
              <h2>{result.title}</h2>
            </div>
          </Link>
        ))}
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results
    }
  }
}
