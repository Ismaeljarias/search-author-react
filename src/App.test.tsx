import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Search Label", () => {
  render(<App />);
  const linkElement = screen.getByLabelText(/Search an author/i);
  expect(linkElement).toBeInTheDocument();
});
