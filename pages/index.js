import Head from 'next/head'

import tasks from './../data/tasks.json'

import { appTitle, appSubtitle } from './../config'
import { SearchBox } from './../components/search'

const Home = () => (
  <div className="container">
    <Head>
      <title>{appTitle} - {appSubtitle}</title>
    </Head>

    <main>
      <h1 className="title">{appTitle}</h1>
      <h2 className="subtitle">{appSubtitle}</h2>

      <SearchBox tasks={tasks} />
    </main>

    <footer>
    </footer>
  </div>
)

export default Home
