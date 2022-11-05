import { Card, Container, Row, Text } from '@nextui-org/react'
import Head from 'next/head'
import Header from 'components/Header'
import fs from 'node:fs/promises'
import Link from 'next/link'
import Image from 'next/image'
import { Layout } from 'components/Layout'

export default function Home({ latestComics }) {
  return (
    <div>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>
      <Layout>
        <h2 className="mb-10 text-3xl font-bold text-center">Latest Comics</h2>
        <section className="grid max-w-md grid-cols-1 gap-2 m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map(comic => (
            <Link
              className="pb-4 mb-4"
              key={comic.id}
              href={`/comic/${comic.id}`}
            >
              <h3 className="pb-2 text-sm font-bold text-center">
                {comic.title}
              </h3>
              <Image
                src={comic.img}
                alt={comic.alt}
                width={comic.width}
                height={comic.height}
              />
            </Link>
          ))}
        </section>
      </Layout>
    </div>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async file => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics
    }
  }
}
