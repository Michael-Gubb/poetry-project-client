import "./Poem.css";
import { generatePoemTitle } from "../utils/poemUtils";

/** Renders individual poem*/
export default function Poem({ poem: poem }: { poem: Poem }) {
  return (
    <li key={poem.poemId} id={poem.poemId}>
      <p>
        ----------------
        <br />
      </p>
      <h2>{generatePoemTitle(poem)}</h2>
      <p className={"poemText"}>{poem.poemText}</p>
      <a href={"#title"}>Top of page</a>
      <p>
        ---------------
        <br />
      </p>
    </li>
  );
}
