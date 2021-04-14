import React from "react";
import { TopBar } from "./app-bar";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import getTheme from "../theme/main-theme";
import styles from "../../styles/Layout.module.css";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      backgroundColor: theme.palette.background.default,
    },
  }),
);

interface IProps {
  spaceoutToolbar?: boolean;
}

const MainLayout: React.FC<IProps> = ({ children, spaceoutToolbar = true }) => {
  const classes = useStyles(getTheme());

  return (
    <div className={styles.root}>
      <TopBar />
      {spaceoutToolbar && <div className={classes.toolbar} />}
      <main className={clsx(classes.content, styles.content)}>{children}</main>
    </div>
  );
};

export default MainLayout;
