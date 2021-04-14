import { FunctionComponent } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import getTheme from "./main-theme";

const ThemeContainer: FunctionComponent<{}> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <ThemeProvider theme={getTheme(prefersDarkMode)}>{children}</ThemeProvider>
  );
};

export default ThemeContainer;
