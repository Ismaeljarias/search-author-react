/** @jsxImportSource theme-ui */

interface Props {
  name: string;
  onClick: () => void;
}

export const AuthorData = ({ name, onClick }: Props) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <li
      sx={{ fontSize: 16, cursor: "pointer", listStyle: "none" }}
      onClick={handleClick}>
      {name}
    </li>
  );
};
