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

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 16px;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
