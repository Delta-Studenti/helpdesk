import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { compose, spacing, palette } from "@material-ui/system";
import Paper from "@material-ui/core/Paper";
import React, { useState } from "react";
import { useTicketsQuery } from "../../src/graphql/tickets.graphql";
import { create } from "node:domain";

const TicketListContainer: React.FC = () => {
  const { data, loading, error } = useTicketsQuery();
  const [page, setPage] = useState(0);

  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;

  const Tag = styled(Button)({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 24,
    width: "auto",
    padding: "0 30px",
  });

  const tickets = data.tickets.map(
    ({ id, title, author, status, created, ticketTags, ticketMessages }) => {
      const createdAt = new Date();
      console.log(new Date(created));
      return (
        <div item container direction="column" xs={12} md={8} key={id}>
          <h1>{title}</h1>
          <div>
            {author.name} · {createdAt.getTime()} ·{" "}
            {status === 0
              ? "nezahájeno"
              : status === 2
              ? "hotovo"
              : "pracuje se na tom"}
          </div>
          <div>{ticketMessages[0].messages}</div>
          <div>
            {ticketTags.map(({ id, title }) => {
              return <Tag key={id}>{title}</Tag>;
            })}
          </div>
        </div>
      );
    },
  );

  return (
    <Grid container>
      <Grid item container direction="column" xs={12} md={4}></Grid>
      <Grid item container direction="column" xs={12} md={8}></Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {tickets}
    </Grid>
  );
};

export default TicketListContainer;
