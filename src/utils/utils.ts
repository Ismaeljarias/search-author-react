import { openLibrary } from "../api/openLibrary";
import { Authors } from "../interfaces/interfaces";

const searchAuthor = async (term: string) => {
  const resp = await openLibrary.get<Authors>(
    `https://openlibrary.org/search/authors.json?q=${term}`
  );

  return resp.data.docs;
};

const authorWork = async (authorId: string) => {
  const resp = await openLibrary.get<Authors>(
    `https://openlibrary.org/authors/${authorId}/works.json`
  );

  return resp.data.docs;
};

const workDetails = async (worksId: string) => {
  const resp = await openLibrary.get<Authors>(
    `https://openlibrary.org${worksId}.json`
  );

  return resp.data.docs;
};
const coverImage = async (id: string) => {
  const resp = await openLibrary.get<Authors>(
    `https://covers.openlibrary.org/b/id/${id}-L.jpg`
  );

  return resp.data.docs;
};
