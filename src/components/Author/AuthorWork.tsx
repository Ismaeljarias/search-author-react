/** @jsxImportSource theme-ui */

interface Props {
  title: string;
  onClick: () => void;
  firstSentence: string;
}

export const AuthorWork = ({ title, onClick, firstSentence }: Props) => {
  return (
    <li
      sx={{
        fontSize: 16,
        cursor: "pointer",
        listStyle: "none",
        border: "1px solid #e4e4e4",
        borderRadius: 3,
        marginBottom: 10,
      }}>
      <button
        sx={{
          backgroundColor: "transparent",
          width: "100%",
          border: "none",
          color: "#181818",
          padding: "15px 32px",
          textAlign: "left",
          textDecoration: "none",
          display: "block",
          fontSize: "16px",
          cursor: "pointer",
          ":hover": { color: "grey" },
        }}
        type="button"
        onClick={onClick}>
        <h3 sx={{ marginTop: 0 }}>{title}</h3>
        <ul sx={{ listStyle: "none", margin: 0, padding: 0 }}>
          {firstSentence ? (
            <li>
              <b>First Sentence:</b> <em>{firstSentence}</em>
            </li>
          ) : (
            <p>Sorry There is not First Sentence of this book...</p>
          )}
        </ul>
      </button>
    </li>
  );
};
