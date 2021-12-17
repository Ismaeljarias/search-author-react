/** @jsxImportSource theme-ui */
import { useCallback, useState } from "react";
import {
  Authors,
  AuthorWork as AuthorWorkInfo,
  Info,
  BookDetails,
} from "../interfaces/interfaces";
import { openLibrary } from "../api/openLibrary";
import { AuthorData, AuthorWork, Book } from "../components";
import { authorWork, getBookDetail } from "../utils/utils";

export const BookAuthor = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [authorData, setAuthorData] = useState<Info[] | null>(null);
  const [authorDetails, setAuthorDetails] = useState<AuthorWorkInfo | null>(
    null
  );
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);

  const searchAuthorData = useCallback(async (author: string) => {
    const result = await openLibrary.get<Authors>(
      `https://openlibrary.org/search/authors.json?q=${author}`
    );
    setAuthorData(result.data.docs);
    setBookDetails(null);
    setAuthorDetails(null);
  }, []);

  const getAuthor = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        searchAuthorData(searchTerm);
      }
    },
    [searchAuthorData, searchTerm]
  );

  const authorClick = useCallback(async (key: string) => {
    const resp = await authorWork(key);
    setAuthorDetails(resp);
  }, []);

  const bookClick = useCallback((key: string) => {
    const bookUrl = key.split("/").filter(Boolean);
    const keyId = bookUrl[bookUrl.length - 1];
    return getBookDetail(keyId).then((book) => setBookDetails(book));
  }, []);

  return (
    <div sx={{ width: "100%", maxWidth: 1200, margin: "0 auto 6em" }}>
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}>
        <label
          htmlFor="search"
          sx={{
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: "-1px",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            width: 1,
          }}>
          Search an author
        </label>
        <input
          id="search"
          sx={{
            width: "50%",
            padding: "12px 20px",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Authors"
          onKeyPress={(e) => getAuthor(e)}
        />
      </div>
      <div>
        {authorData && !authorDetails ? (
          <ul>
            {authorData?.map((author) => (
              <AuthorData
                key={author.key}
                onClick={() => authorClick(author.key)}
                name={author.name}
              />
            ))}
          </ul>
        ) : null}
        {authorDetails && !bookDetails ? (
          <ul>
            {authorDetails?.entries?.map((detail) => (
              <AuthorWork
                key={detail.key}
                title={detail.title}
                onClick={() => bookClick(detail.key)}
              />
            ))}
          </ul>
        ) : null}
      </div>

      {bookDetails ? (
        <Book
          title={bookDetails.title}
          published={bookDetails.created}
          covers={bookDetails.covers}
          subjects={bookDetails.subjects}
          firstSentence={bookDetails.first_sentence?.value}
          description={bookDetails.description}
        />
      ) : null}
    </div>
  );
};
