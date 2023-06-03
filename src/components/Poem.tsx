import "./Poem.css";
import { generatePoemTitle } from "../utils/poemUtils";

/** Renders individual poem*/
export default function Poem({
  poem,
  display,
}: {
  poem: Poem;
  display: boolean;
}) {
  const cssDisplay = display ? {} : { display: "none" };
  {
    return (
      <li key={poem.poemId} id={poem.poemId} style={cssDisplay}>
        <p>
          ----------------
          <br />
        </p>
        <h2>{generatePoemTitle(poem)}</h2>
        <p>Created at {poem.poemDate}</p>
        <p className={"poemText"}>{poem.poemText}</p>
        <a href={"#title"}>Top of page</a>
        <p>
          -----------------
          <br />
        </p>
      </li>
    );
  }
}
