/** @jsxImportSource theme-ui */

interface Props {
  name: string;
  onClick: () => void;
  birth: string;
  death: string;
  topWork: string;
  bookCount: number;
}
export const AuthorData = ({
  name,
  onClick,
  birth,
  death,
  topWork,
  bookCount,
}: Props) => {
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
        <h3 sx={{ marginTop: 0 }}>{name}</h3>
        <ul
          sx={{
            padding: "0",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            listStyle: "none",
            gap: 10,
          }}>
          <li>
            <b>Birth Date:</b> {birth}
          </li>
          <li>
            <b>Death Date:</b> {death}
          </li>
          <li>
            <b>Top Work:</b> {topWork}
          </li>
          <li>
            <b>Book Count:</b> {bookCount}
          </li>
        </ul>
      </button>
    </li>
  );
};
