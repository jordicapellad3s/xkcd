import { Container, Row, Text } from '@nextui-org/react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between p-4 max-w-xl m-auto">
      <div>
        <span className="text-2xl font-bold">next</span>
        <span className="font-light text-2xl">xkcd</span>
      </div>
      <nav>
        <ul className="flex flex-row gap-2">
          <li>
            <Link href="/" className="text-sm font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-sm font-semibold">
              About
            </Link>
          </li>
          <li>
            <Link href="/search" className="text-sm font-semibold">
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
