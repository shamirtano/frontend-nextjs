import Link from "next/link"

export async function getStaticProps({ params }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bookid}`)
    const data = await res.json()    
    return {
        props: {
            book: data
        }        
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await res.json()
    return {
        paths: data.map(book => ({
            params: {
                bookid: book.id.toString()
            }
        })),    
        fallback: false
    }
}

const BookDetail = ({ book }) => {
    return (
        <div>
            <Link href="/libros">Lista</Link>
            <h1>Detalle de Libro {`${book[0].id}`}</h1>
            <hr />            
            <h3>{book[0].title}</h3>            
            <p>Creación: {new Date(book[0].created_at).toLocaleDateString()}</p>
            <p>Actualización: {new Date(book[0].updated_at).toLocaleDateString()}</p>
        </div>
    )
}

export default BookDetail