import { Connection, createConnection, getConnection } from "typeorm";
import { Accounts } from "../src/db/entities/Accounts";
import { Sessions } from "../src/db/entities/Sessions";
import { Tags } from "../src/db/entities/Tags";
import { TicketMessages } from "../src/db/entities/TicketMessages";
import { Tickets } from "../src/db/entities/Tickets";
import { TicketTags } from "../src/db/entities/TicketTags";
import { Users } from "../src/db/entities/Users";
import { VerificationRequests } from "../src/db/entities/VerificationRequests";

let connectionReadyPromise: Promise<void> | null = null;

export const dbConnect = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      await createConnection({
        type: "mariadb",
        host: process.env.NEXT_PUBLIC_DB_ADDRESS,
        port: parseInt(process.env.NEXT_PUBLIC_DB_PORT),
        username: process.env.NEXT_PUBLIC_DB_USERNAME,
        password: process.env.NEXT_PUBLIC_DB_PASSWORD,
        database: process.env.NEXT_PUBLIC_DB_NAME,
        entities: [
          Accounts,
          Sessions,
          Tags,
          TicketMessages,
          Tickets,
          TicketTags,
          Users,
          VerificationRequests,
        ],
      });
    })();
  }

  return connectionReadyPromise;
};

export const getConnectionString = () => `mysql://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@${process.env.NEXT_PUBLIC_DB_ADDRESS}:${process.env.NEXT_PUBLIC_DB_PORT}/${process.env.NEXT_PUBLIC_DB_NAME}`;
