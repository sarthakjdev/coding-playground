import Link from "next/link"

const availablePlaygrounds = [
    {
        id: 'css',
        type: 'css',
    },
    {
        id: 'html',
        type: 'html'
    },
    {
        id: 'react',
        type: 'react'
    },
    {
        id: 'javascript',
        type: 'javascript'
    }
]

export default function PlaygroundSelector(): JSX.Element {
    return (
        <section>

            {
                availablePlaygrounds.map((p) => {
                    return (
                        <Link href={`/playground/${p.type}`} key={p.id}>                    
                        <article>
                            {p.id}
                        </article></Link>
                    )
                })
            }

        </section>
    )
}