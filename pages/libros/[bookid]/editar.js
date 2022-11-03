import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

export async function getServerSideProps({ params }) {   
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bookid}`)
    const data = await res.json()
    return {
        props: {
            book: data[0]
        }        
    }
}

const BookEdit = ({ book }) => {

    const router = useRouter()
    const [bookTitle, setBookTitle] = useState(book.title)
    const [errors, setErrors] = useState([])

    // submitting para conexiones lentas
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: bookTitle,
                _method: 'PATCH'
            })
        })

        if(res.ok) {
            setErrors([])
            setBookTitle('')
            return router.push('/libros')
        }

        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)        
    }

    return (
        <div>
            <h1>Editar Libro</h1>
            <Link href="/libros">Lista</Link>            
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setBookTitle(e.target.value)}
                    value={String(bookTitle)}
                    disabled={submitting}
                    type="text"
                    id="title"
                />
                <button 
                    type="submit"
                    disabled={submitting}
                    >{submitting ? 'Actualizando...' : 'Actualizar'}
                </button>
                {errors.title && (
                    <span style={{color: 'red', display: 'block'}}>{errors.title}</span>
                )}
            </form>
        </div>
    )
}

export default BookEdit