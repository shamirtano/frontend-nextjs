import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"

const BookCreate = () => {

    const router = useRouter()
    const [bookTitle, setBookTitle] = useState('')
    const [errors, setErrors] = useState([])

    // submitting para conexiones lentas
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: bookTitle
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
            <h1>Crear Libro</h1>
            <Link href="/libros">Lista</Link>            
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setBookTitle(e.target.value)}
                    value={bookTitle}
                    disabled={submitting}
                    type="text"
                    id="title"
                />
                <button 
                    type="submit"
                    disabled={submitting}
                    >{submitting ? 'Creando...' : 'Crear'}
                </button>
                {errors.title && (
                    <span style={{color: 'red', display: 'block'}}>{errors.title}</span>
                )}
            </form>
        </div>
    )
}

export default BookCreate