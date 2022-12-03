import Head from 'next/head'
import Image from 'next/image'
import CodeEditor from '../src/components/CodeEditor'
import PlaygroundSelector from '../src/components/Home/PlaygroundSelector'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-full'>
        <h1>Coding Playground</h1>
        <PlaygroundSelector />
      </main>
    </div>
  )
}
