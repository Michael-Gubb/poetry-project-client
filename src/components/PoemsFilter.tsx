import { useState } from "react";
import "./PoemsFilter.css";

/** Controls filtering of poems by genre and topic */
export default function PoemsFilter({
  poemGenres,
  poemTopics,
  hiddenTopics,
  setHiddenTopics,
  hiddenGenres,
  setHiddenGenres,
}: {
  poemGenres: string[];
  poemTopics: string[];
  hiddenTopics: TopicsToRemove;
  setHiddenTopics: React.Dispatch<React.SetStateAction<TopicsToRemove>>;
  hiddenGenres: GenresToRemove;
  setHiddenGenres: React.Dispatch<React.SetStateAction<GenresToRemove>>;
}) {
  const [closed, setClosed] = useState(true);
  function handleShow() {
    setClosed((v) => {
      return !v;
    });
  }
  return (
    <div>
      <button onClick={handleShow}>
        {closed ? "Show Poems filters" : "Hide Poems filters"}
      </button>
      <div className={closed ? "hidden" : ""}>
        <GenreFilter
          poemGenres={poemGenres}
          hiddenGenres={hiddenGenres}
          setHiddenGenres={setHiddenGenres}
        />
        <TopicsFilter
          poemTopics={poemTopics}
          hiddenTopics={hiddenTopics}
          setHiddenTopics={setHiddenTopics}
        />
      </div>
    </div>
  );
}
/** Controls filtering of poems by genre */
function GenreFilter({
  poemGenres,
  hiddenGenres,
  setHiddenGenres,
}: {
  poemGenres: string[];
  hiddenGenres: GenresToRemove;
  setHiddenGenres: React.Dispatch<React.SetStateAction<GenresToRemove>>;
}) {
  const [closed, setClosed] = useState(true);
  function handleShow() {
    setClosed((v) => {
      return !v;
    });
  }
  return (
    <div>
      <button onClick={handleShow}>
        {closed ? "Show Genre filter" : "Hide Genre filter"}
      </button>
      <div className={closed ? "hidden" : ""}>
        <h2>Genre filter</h2>
        <form>
          {poemGenres.map((genre) => (
            <GenreFilterInput
              genre={genre}
              key={genre}
              hiddenGenres={hiddenGenres}
              setHiddenGenres={setHiddenGenres}
            />
          ))}
        </form>
      </div>
    </div>
  );
}

function GenreFilterInput({
  genre,
  hiddenGenres,
  setHiddenGenres,
}: {
  genre: string;
  hiddenGenres: GenresToRemove;
  setHiddenGenres: React.Dispatch<React.SetStateAction<GenresToRemove>>;
}) {
  const displayValue = !hiddenGenres[genre];
  const handleChange = () => {
    const newGenres = { ...hiddenGenres };
    newGenres[genre] = !hiddenGenres[genre];
    setHiddenGenres(newGenres);
  };
  return (
    <div>
      <label htmlFor={genre}>{genre}</label>
      <input
        id={genre}
        type="checkbox"
        checked={displayValue}
        onChange={handleChange}
      ></input>
    </div>
  );
}

/** Controls filtering of poems by topic */
function TopicsFilter({
  poemTopics,
  hiddenTopics,
  setHiddenTopics,
}: {
  poemTopics: string[];
  hiddenTopics: TopicsToRemove;
  setHiddenTopics: React.Dispatch<React.SetStateAction<TopicsToRemove>>;
}) {
  const [closed, setClosed] = useState(true);
  function handleShow() {
    setClosed((v) => {
      return !v;
    });
  }
  return (
    <div>
      <button onClick={handleShow}>
        {closed ? "Show Topics filter" : "Hide Topics filter"}
      </button>
      <div className={closed ? "hidden" : ""}>
        <h2>Topic filter</h2>
        <form>
          {poemTopics.map((topic) => (
            <TopicFilterInput
              topic={topic}
              key={topic}
              hiddenTopics={hiddenTopics}
              setHiddenTopics={setHiddenTopics}
            />
          ))}
        </form>
      </div>
    </div>
  );
}

function TopicFilterInput({
  topic,
  hiddenTopics,
  setHiddenTopics,
}: {
  topic: string;
  hiddenTopics: TopicsToRemove;
  setHiddenTopics: React.Dispatch<React.SetStateAction<TopicsToRemove>>;
}) {
  const displayValue = !hiddenTopics[topic];
  const handleChange = () => {
    const newTopics = { ...hiddenTopics };
    newTopics[topic] = !hiddenTopics[topic];
    setHiddenTopics(newTopics);
  };
  return (
    <div>
      <label htmlFor={topic}>{topic}</label>
      <input
        id={topic}
        type="checkbox"
        checked={displayValue}
        onChange={handleChange}
      ></input>
    </div>
  );
}
