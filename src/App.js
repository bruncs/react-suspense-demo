import React, { Component, Fragment, Suspense } from "react";
import { createResource } from "simple-cache-provider";
import { withCache } from "./components/withCache";
import sample from "./sample";

const sleep = ms => new Promise(r => setTimeout(() => r(), ms));

const readShows = createResource(async function fetchNews() {
  await sleep(3000);
  const res = await fetch(`http://api.tvmaze.com/search/shows?q=suits`);
  return await res.json();
});

const Movies = withCache(props => {
  const result = sample;
  return (
    <Fragment>
      {result &&
        result.length &&
        result.map(item => (
          <div key={Math.random()} className="column is-4">
            <div className="movie">
              <div className="movie__left">
                <img alt="" src={item.show.image.original} />
              </div>
              <div className="movie__right">
                <div className="movie__right__title">{item.show.name}</div>
                <div className="movie__right__subtitle">
                  Score: {item.show.rating.average}
                </div>
                <div className="movie__right__subtitle">
                  Status: {item.show.status}
                </div>
                <div className="movie__right__subtitle">
                  Network: {item.show.network ? item.show.network.name : "N/A"}
                </div>
                <a
                  href={item.show.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="movie__right__subtitle"
                >
                  Link
                </a>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
});

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">React Suspense Demo</h1>
          </header>

          <div className="container">
            <div className="columns is-multiline">
              <Suspense ms={5000} fallback={<h2>Movies list is loading...</h2>}>
                <Movies />
              </Suspense>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
