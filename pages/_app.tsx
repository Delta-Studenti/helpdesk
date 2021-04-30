import "../styles/globals.css";
import { Provider } from "next-auth/client";
import React from "react";
import { ThemeProvider } from "../components/theme";
import "reflect-metadata";

const MyApp = ({ Component, pageProps }) => {
  console.log(process.env.NEXT_PUBLIC_DB_CONN);

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
