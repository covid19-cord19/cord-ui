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
        background: url("/iStock-695349930.jpg") no-repeat fixed;
        background-size: cover;
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 16px;
      }

      main {
        margin: auto;
        max-width: 1024px;
      }

      .title {
        text-align: center;
        margin: 2rem 0;
      }

      .card {
        background: #2196F3;
      }

      .card__score {
        background: #0D47A1;
        color: #fff;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
