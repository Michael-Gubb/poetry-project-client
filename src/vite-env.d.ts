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
/**
 * Shape of the JSON object returned from the server from api/poems with GET
 */
type GetPoems = { poems: Poem[] };

type GenresToRemove = {
  [index: string]: boolean;
};
type TopicsToRemove = {
  [index: string]: boolean;
};

/**
 * Fetches an additional number of poems given by morePoems, with a default value of 50 extra
 */
type MorePoems = (morePoems?: number) => void;
