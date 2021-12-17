/** @jsxImportSource theme-ui */

interface Props {
  title: string;
  onClick: () => void;
}

export const AuthorWork = ({ title, onClick }: Props) => {
  return (
    <li sx={{ cursor: "pointer" }} onClick={onClick}>
      {title}
    </li>
  );
};
