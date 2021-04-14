import Head from "next/head";
import React from "react";
import { withAuth } from "../components/auth-wrapper";
import { MainLayout } from "../components/layout";
import { TicketListContainer } from "../components/ticket-list";

const TestPage: React.FC = () => {
  return (
    <MainLayout>
      <div>
        <Head>
          <title>Tickety - Helpdesk - Delta SŠIE</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TicketListContainer />
      </div>
    </MainLayout>
  );
};

export default withAuth(TestPage);
