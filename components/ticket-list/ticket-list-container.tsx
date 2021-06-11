import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useTicketsQuery } from "../../src/graphql/tickets.graphql";
import { create } from "node:domain";

const TicketListContainer: React.FC = () => {
  const { data, loading, error } = useTicketsQuery();
  const [page, setPage] = useState(0);

  if (error) return <div>error</div>;
  if (loading) return <div>loading</div>;

  const tickets = data.tickets.map(
    ({ id, title, author, status, created, ticketTags, ticketMessages }) => {
      const time = new Date(parseInt(created))
        .toLocaleDateString("cs-cz")
        .toString();
      return (
        <Container key={id}>
          <Typography
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom={false}
          >
            {title}
          </Typography>
          <Typography align="left" color="textSecondary" gutterBottom={true}>
            {author.name} · {time} ·{" "}
            {status === 0
              ? "nezahájeno"
              : status === 2
              ? "hotovo"
              : "pracuje se na tom"}
          </Typography>
          <Typography gutterBottom={true}>
            {ticketMessages[0].messages}
          </Typography>
          <div>
            {ticketTags.map(({ id, title }) => {
              return (
                <Button key={id} variant="contained" color="secondary">
                  {title}
                </Button>
              );
            })}
          </div>
        </Container>
      );
    },
  );

  return <div>{tickets}</div>;
};

export default TicketListContainer;
