import Head from 'next/head'
import Header from 'components/Header'
import Image from 'next/image'
import { readFile, readdir, stat } from 'fs/promises'
import Link from 'next/link'
import { basename } from 'path'
import { Layout } from 'components/Layout'

export default function Comic({
  name,
  img,
  alt,
  title,
  width,
  height,
  nextId,
  prevId,
  hasNext,
  hasPrevious
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>
      <Layout>
        <section className="flex flex-col items-center max-w-lg m-auto">
          <h1 className="mb-2 text-2xl font-bold">{title}</h1>
          <Image src={img} alt={alt} width={width} height={height} />
          <p className="p-1 my-8 rounded-lg bg-neutral-100">{alt}</p>
          {/* Create pagination with nextId and preId if available */}
          <div>
            {hasPrevious && (
              <Link
                className="px-2 py-1 mr-2 text-sm font-semibold rounded-lg bg-neutral-700 text-neutral-50"
                href={`/comic/${prevId}`}
              >
                ← Previous
              </Link>
            )}
            {hasNext && (
              <Link
                href={`/comic/${nextId}`}
                className="px-2 py-1 mr-2 text-sm font-semibold rounded-lg bg-neutral-700 text-neutral-50"
              >
                Next →
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const files = await readdir('./comics')

  const paths = files.map(file => {
    const id = basename(file, '.json')
    return {
      params: {
        id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId
    }
  }
}
