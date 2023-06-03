import { useState } from "react";
import { allPoemGenres, allPoemTopics } from "../utils/poemUtils";

/** Controls filtering of poems by genre and topic */
export default function PoemsFilter() {
  const [closed, setClosed] = useState(true);
  function handleShow() {
    setClosed((v) => {
      return !v;
    });
  }
  const cssDisplay = closed ? { display: "none" } : {};
  return (
    <div>
      <button onClick={handleShow}>
        {closed ? "Show Poems filter" : "Hide Poems filter"}
      </button>
      <div style={cssDisplay}>
        <GenreFilter />
        <TopicsFilter />
      </div>
    </div>
  );
}
/** Controls filtering of poems by genre */
function GenreFilter() {
  const [closed, setClosed] = useState(true);
  function handleShow() {
    setClosed((v) => {
      return !v;
    });
  }
  const cssDisplay = closed ? { display: "none" } : {};
  return (
    <div>
      <button onClick={handleShow}>
        {closed ? "Show Genre filter" : "Hide Genre filter"}
      </button>
      <div style={cssDisplay}>
        <h2>Genre filter</h2>
        <form>
          {allPoemGenres.map((genre) => (
            <GenreFilterInput genre={genre} key={genre} />
          ))}
        </form>
      </div>
    </div>
  );
}

function GenreFilterInput({ genre }: { genre: string }) {
  return (
    <>
      <label htmlFor={genre}>{genre}</label>
      <input id={genre} type="checkbox"></input>
    </>
  );
}

/** Controls filtering of poems by topic */
function TopicsFilter() {
  const [closed, setClosed] = useState(true);
  function handleShow() {
    setClosed((v) => {
      return !v;
    });
  }
  const cssDisplay = closed ? { display: "none" } : {};
  return (
    <div>
      <button onClick={handleShow}>
        {closed ? "Show Topics filter" : "Hide Topics filter"}
      </button>
      <div style={cssDisplay}>
        <h2>Topic filter</h2>
        <form>
          {allPoemTopics.map((topic) => (
            <TopicFilterInput topic={topic} key={topic} />
          ))}
        </form>
      </div>
    </div>
  );
}

function TopicFilterInput({ topic }: { topic: string }) {
  return (
    <>
      <label htmlFor={topic}>{topic}</label>
      <input id={topic} type="checkbox"></input>
    </>
  );
}
