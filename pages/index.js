import Head from 'next/head'

import tasks from './../data/tasks.json'

import { SearchBox } from './../components/search'

const Home = () => (
  <div className="container">
    <Head>
      <title>COVID-19 - What to know</title>
    </Head>

    <main>
      <h1 className="title">
        COVID-19 Documentation Search
      </h1>

      <SearchBox tasks={tasks} />
    </main>

    <footer>
    </footer>
  </div>
)

export default Home
