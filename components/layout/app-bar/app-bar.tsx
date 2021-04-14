import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styles from "../../../styles/TopBar.module.css";
import { LoginButton } from "../../login-button";
import Link from "next/link";

const TopBar: React.FC = () => {
  return (
    <AppBar position="fixed" className={styles.appbar}>
      <Toolbar>
        {/* <IconButton
          edge="start"
          className={""}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        <Link href="/">
          <Typography variant="h6" className={styles.title}>
            Helpdesk - Delta SŠIE
          </Typography>
        </Link>
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
