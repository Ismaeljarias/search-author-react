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
    if (author.trim() === "") return;
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

  console.log(authorDetails);

  return (
    <div sx={{ width: "100%", maxWidth: 1200, margin: "0 auto 6em" }}>
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
          alignItems: "center",
        }}>
        <label sx={{ paddingRight: 20 }} htmlFor="search">
          Search for Author
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
            "@media screen and (max-width: 800px)": {
              width: "80%",
            },
          }}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Author and Enter"
          onKeyPress={(e) => getAuthor(e)}
        />
      </div>
      <div sx={{ width: 750, margin: "0 auto" }}>
        {authorData && !authorDetails ? (
          <>
            <h3>List of Authors</h3>
            <ul sx={{ margin: 0, padding: 0 }}>
              {authorData?.map((author) => (
                <AuthorData
                  key={author.key}
                  onClick={() => authorClick(author.key)}
                  name={author.name}
                  birth={author.birth_date || ""}
                  death={author.death_date || ""}
                  topWork={author.top_work}
                  bookCount={author.work_count}
                />
              ))}
            </ul>
          </>
        ) : null}
        {authorDetails && !bookDetails ? (
          <>
            <h3>List of books</h3>
            <ul sx={{ margin: 0, padding: 0 }}>
              {authorDetails?.entries?.map((detail) => (
                <AuthorWork
                  key={detail.key}
                  title={detail.title}
                  onClick={() => bookClick(detail.key)}
                  firstSentence={detail.first_sentence?.value || ""}
                />
              ))}
            </ul>
          </>
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
