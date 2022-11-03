import Link from "next/link"

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await res.json()
    return {
        props: {
            books: data
        }
    }
}

const BookList = ({ books }) => {

    async function handleDelete(e, id) {
        e.preventDefault()
        console.log('delete' + id)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                
                _method: 'DELETE'
            })
        })

        if(res.ok) {
            window.location.reload()
        }
    }

    return (
        <div>            
            <h1>Lista de Libros</h1>
            <Link href="/libros/crear">Crear</Link>

            <table className="table table-bordered table-stripe">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Creación</th>
                        <th scope="col">Actualización</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{book.title}</td>
                            <td>{new Date(book.created_at).toLocaleDateString()}</td>
                            <td>{new Date(book.updated_at).toLocaleDateString()}</td>
                            <td>
                                <Link href={`/libros/${book.id}`} data-cy={`link-to-visit-book-${book.id}`}>Detalles</Link>&nbsp;
                                <Link href={`/libros/${book.id}/editar`} data-cy={`link-to-edit-book-${book.id}`}>Editar</Link>&nbsp;
                                <form 
                                    onSubmit={(e) => handleDelete(e, book.id)}
                                    style={{ display: 'inline' }}
                                    >
                                    <button 
                                        type="submit"
                                        data-cy={`link-to-delete-book-${book.id}`}
                                        >Eliminar
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookList