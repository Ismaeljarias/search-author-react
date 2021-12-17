import { ThemeProvider } from "theme-ui";
import { SearchBar } from "./components";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SearchBar />
    </ThemeProvider>
  );
};

export default App;
