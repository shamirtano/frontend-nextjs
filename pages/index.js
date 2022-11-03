import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>API de Libros</title>
        <meta name="description" content="Frontend con next js y api en laravel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/libros">Libros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/libros/crear">Crear Libro</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Link href="/libros">
        Lista de Libros
      </Link>
    </div>
  )
}
