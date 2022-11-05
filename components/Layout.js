import Footer from './Footer'
import Header from './Header'

export function Layout({ children }) {
  return (
    <div className="max-w-md m-auto">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
