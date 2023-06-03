import { useState } from "react";

/** Creates list of poem titles with links to poems */
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
      <p style={cssDisplay}>Genre table</p>
    </div>
  );
}

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
      <p style={cssDisplay}>Topics table</p>
    </div>
  );
}
