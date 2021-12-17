/** @jsxImportSource theme-ui */

interface Props {
  name: string;
  onClick: () => void;
}
export const AuthorData = ({ name, onClick }: Props) => {
  return (
    <li
      sx={{
        fontSize: 16,
        cursor: "pointer",
        listStyle: "none",
        ":hover": { color: "grey" },
      }}
      onClick={onClick}>
      {name}
    </li>
  );
};
