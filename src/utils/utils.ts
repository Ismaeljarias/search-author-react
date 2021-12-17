import { openLibrary } from "../api/openLibrary";
import { Authors, AuthorWork, BookDetails } from "../interfaces/interfaces";

export const searchAuthor = async (term: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const resp = await openLibrary.get<Authors>(
    `https://openlibrary.org/search/authors.json?q=${term}`
  );

  return resp.data.docs;
};

export const authorWork = async (authorId: string) => {
  const resp = await openLibrary.get<AuthorWork>(
    `https://openlibrary.org/authors/${authorId}/works.json`
  );

  return resp.data;
};

export const getBookDetail = async (key: string) => {
  const resp = await openLibrary.get<BookDetails>(
    `https://openlibrary.org/works/${key}.json`
  );

  return resp.data;
};
