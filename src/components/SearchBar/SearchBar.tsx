/** @jsxImportSource theme-ui */
import { useState } from "react";
import {
  Authors,
  AuthorWork as AuthorWorkInfo,
  Info,
} from "../../interfaces/interfaces";
import { openLibrary } from "../../api/openLibrary";
import { AuthorData } from "../AuthorData";
import { AuthorWork } from "../AuthorData/AuthorWork";
import { BookDetails } from "../../interfaces/interfaces";

export const searchAuthor = async (term: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const resp = await openLibrary.get<Authors>(
    `https://openlibrary.org/search/authors.json?q=${term}`
  );

  return resp.data.docs;
};

const authorWork = async (authorId: string) => {
  const resp = await openLibrary.get<AuthorWorkInfo>(
    `https://openlibrary.org/authors/${authorId}/works.json`
  );

  return resp.data;
};

const getBookDetail = async (key: string) => {
  const resp = await openLibrary.get<BookDetails>(
    `https://openlibrary.org/works/${key}.json`
  );

  return resp.data;
};

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [authorData, setAuthorData] = useState<Info[]>();
  const [authorDetails, setAuthorDetails] = useState<AuthorWorkInfo | null>(
    null
  );
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);

  const searchAuthorData = async (author: string) => {
    const result = await openLibrary.get<Authors>(
      `https://openlibrary.org/search/authors.json?q=${author}`
    );
    setAuthorData(result.data.docs);
    setBookDetails(null);
    setAuthorDetails(null);
  };

  const getAuthor = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchAuthorData(searchTerm);
    }
  };

  const authorClick = async (key: string) => {
    const resp = await authorWork(key);
    setAuthorDetails(resp);
  };

  function bookClick(key: string) {
    const bookUrl = key.split("/").filter(Boolean);
    const keyId = bookUrl[bookUrl.length - 1];
    return getBookDetail(keyId).then((book) => setBookDetails(book));
    // console.log(resp);
  }

  console.log(bookDetails);

  return (
    <div sx={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}>
        <input
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
      <ul
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {authorData && !authorDetails
          ? authorData?.map((author) => (
              <AuthorData
                key={author.key}
                onClick={() => authorClick(author.key)}
                name={author.name}
              />
            ))
          : null}
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
      </ul>
      <div>
        {bookDetails ? (
          <div>
            <h1>{bookDetails.title}</h1>
            <p>
              Published date:{" "}
              {new Date(bookDetails.created.value).toDateString()}
            </p>
            {bookDetails.covers && (
              <div>
                <img
                  src={`https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`}
                  alt=""
                />
              </div>
            )}
            <ul>
              {bookDetails.subjects?.map((subject, index) => (
                <li key={`${subject}-${index}`}>{subject}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};
