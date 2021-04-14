import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";

const TicketListContainer: React.FC = () => {
  return (
    <Grid container>
      <Grid item container direction="column" xs={12} md={8}>
        <Paper>test</Paper>
      </Grid>
      <Grid item container direction="column" xs={12} md={4}></Grid>
    </Grid>
  );
};

export default TicketListContainer;
