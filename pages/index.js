import { Card, Container, Row, Text } from '@nextui-org/react'
import Head from 'next/head'
import Header from '../components/Header'
import fs from 'fs/promises'
import Link from 'next/link'
import Image from 'next/image'

export default function Home({ latestComics }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 className="text-3xl font-bold text-center mb-10">Latest Comics</h2>
        <section className="grid grid-cols-2 gap-2 max-w-md m-auto">
          {latestComics.map(comic => (
            <Link
              className="mb-4 pb-4"
              key={comic.id}
              href={`/comic/${comic.id}`}
            >
              <h3 className="font-bold text-center text-sm pb-2">
                {comic.title}
              </h3>
              <Image
                src={comic.img}
                alt={comic.alt}
                style={{ objectFit: 'contain', fill: 'intrins' }}
                width="300"
                height="300"
              />
            </Link>
          ))}
        </section>
      </main>
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
