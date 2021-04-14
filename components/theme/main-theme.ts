import { createMuiTheme, Theme } from "@material-ui/core";

const getTheme = (dark: boolean = true): Theme => {
  const mainTheme = createMuiTheme({
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: "#40a351",
      },
    },
  });

  return mainTheme;
};

export default getTheme;
