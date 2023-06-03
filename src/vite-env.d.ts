/// <reference types="vite/client" />

/**
 * Poem received via API
 */
type Poem = {
  /** UUID */
  poemId: string;
  /** Includes \n */
  poemText: string;
  /** Length 3 array */
  poemTopics: string[];
  /** Genre */
  poemGenre: string;
  /** Image url */
  poemImg: string | null;
  //** Date created (Auckland TZ). As string as dates are annoying */
  poemDate: string;
};

type GenresToRemove = {
  [index: string]: boolean;
};
type TopicsToRemove = {
  [index: string]: boolean;
};
