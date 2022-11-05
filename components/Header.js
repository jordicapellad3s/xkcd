import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between max-w-xl p-4 m-auto">
      <div>
        <h1 className="text-2xl font-bold transition hover:opacity-50">
          <Link href="/">
            <span>next</span>
            <span className="font-light">xkcd</span>
          </Link>
        </h1>
      </div>
      <nav>
        <ul className="flex flex-row gap-2">
          <li>
            <Link
              href="/"
              className="text-sm font-semibold transition hover:opacity-50"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              className="text-sm font-semibold transition hover:opacity-50"
            >
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
