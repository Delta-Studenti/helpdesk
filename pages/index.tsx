import { Typography } from "@material-ui/core";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { MainLayout } from "../components/layout";
import { ShowTicketsButton } from "../components/show-tickets-button";
import styles from "../styles/Home.module.css";

const HomePage: React.FC = () => {
  return (
    <MainLayout spaceoutToolbar={false}>
      <div className={styles.bkgImage}>
        <div className={styles.container}>
          <Head>
            <title>Helpdesk - Delta SŠIE</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={styles.main}>
            <Typography variant="h1" className={styles.title}>
              Helpdesk
            </Typography>
            <Link href="list">
              <ShowTicketsButton />
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
