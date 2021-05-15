import "../styles/globals.css";
import { Provider } from "next-auth/client";
import React from "react";
import { ThemeProvider } from "../components/theme";
import "reflect-metadata";
import { useApollo } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";

const MyApp = ({ Component, pageProps }) => {
  // console.log(process.env.NEXT_PUBLIC_DB_CONN);
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default MyApp;
