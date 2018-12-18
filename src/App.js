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
            <div className="box">
              <div className="movie__left">
                <a
                  href={item.show.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="movie__right__subtitle"
                >
                  <img alt="" src={item.show.image.original} width="200" />
                </a>
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
      <React.StrictMode>
        <div className="App">
          <section class="hero is-dark">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">React Suspense Demo</h1>
                <h2 class="subtitle">
                  Let's add some suspense!{" "}
                  <span role="img" aria-label="ghost">
                    😏👻
                  </span>
                </h2>
              </div>
            </div>
          </section>
          <div className="container">
            <div className="columns is-multiline">
              <Suspense ms={5000} fallback={<h2>Movies list is loading...</h2>}>
                <Movies />
              </Suspense>
            </div>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
