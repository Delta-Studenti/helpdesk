import Head from "next/head";
import React from "react";
import { withAuth } from "../components/auth-wrapper";
import { MainLayout } from "../components/layout";
import { TicketListContainer } from "../components/ticket-list";
import { useTicketsQuery } from "../src/graphql/tickets.graphql";

const TestPage: React.FC = () => {
  const {data, loading, error} = useTicketsQuery();
  return (
    <MainLayout>
      <div>
        <Head>
          <title>Tickety - Helpdesk - Delta SŠIE</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TicketListContainer />
        {loading ? "loading": error?"error":JSON.stringify(data)}
      </div>
    </MainLayout>
  );
};

export default withAuth(TestPage);
