/** @jsxImportSource theme-ui */

interface Props {
  title: string;
  published: {
    value: string;
  };
  covers?: number[];
  subjects?: string[];
  firstSentence?: string;
  description?: string;
}

export const Book = ({
  title,
  published,
  covers,
  subjects,
  firstSentence,
  description,
}: Props) => {
  return (
    <div
      sx={{
        width: "80%",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        margin: "0 auto",
        gap: 20,
        padding: 20,
        border: "1px solid rgba(128 128 128 / 10%);",

        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        "@media screen and (max-width: 800px)": {
          display: "block",
        },
      }}>
      <div>
        {covers ? (
          <img
            sx={{ width: "100%" }}
            src={`https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`}
            alt={title}
          />
        ) : (
          <>
            <p>Cover not available...</p>
          </>
        )}
      </div>
      <div>
        <h1 sx={{ lineHeight: "1em" }}>{title}</h1>
        {published ? (
          <p>Published date: {new Date(published.value).toDateString()}</p>
        ) : (
          <p>Published Date not available...</p>
        )}

        {firstSentence ? (
          <p sx={{ lineHeight: "13px", fontSize: 12, fontStyle: "italic" }}>
            {firstSentence}..
          </p>
        ) : (
          <p>First sentence not available...</p>
        )}

        {description ? (
          <p sx={{ lineHeight: "1.3em" }}>{description}</p>
        ) : (
          <p>Description not available...</p>
        )}
        {subjects ? (
          <>
            <p sx={{ marginBottom: 2 }}>Subjects: </p>
            <ul
              sx={{
                marginTop: 2,
                columns: 2,
              }}>
              {subjects?.map((subject, index) => (
                <li sx={{ fontSize: 14 }} key={`${subject}-${index}`}>
                  {subject}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>Subject not available...</p>
        )}
      </div>
    </div>
  );
};
