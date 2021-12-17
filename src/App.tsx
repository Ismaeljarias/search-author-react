import { ThemeProvider } from "theme-ui";
import { BookAuthor } from "./pages/BookAuthor";

import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BookAuthor />
    </ThemeProvider>
  );
};

export default App;
