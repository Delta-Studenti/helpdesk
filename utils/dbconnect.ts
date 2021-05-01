import { Connection, createConnection, getConnection } from "typeorm";
import { Accounts } from "../src/db/entities/Accounts";
import { Sessions } from "../src/db/entities/Sessions";
import { Tags } from "../src/db/entities/Tags";
import { TicketMessages } from "../src/db/entities/TicketMessages";
import { Tickets } from "../src/db/entities/Tickets";
import { TicketTags } from "../src/db/entities/TicketTags";
import { Users } from "../src/db/entities/Users";
import { VerificationRequests } from "../src/db/entities/VerificationRequests";

////@ts-ignore
// let cached = global.db;
// if (!cached) {
//     //@ts-ignore
//     cached = global.db = { conn: null, promise: null };
// }

// export const dbConnect = async (): Promise<Connection> => {
//     if (cached.conn) {
//         cached.conn.close();
//         //@ts-ignore
//         cached = global.db = { conn: null, promise: null };
//     }   
    
//     cached.promise = createConnection({
//         type: "mariadb",
//         host: "localhost",
//         port: 3306,
//         username: "helpdesk",
//         password: "Heslo123",
//         database: "helpdesk",
//         entities: [
//             Accounts,
//             Sessions,
//             Tags,
//             TicketMessages,
//             Tickets,
//             TicketTags,
//             Users,
//             VerificationRequests
//         ]
//     });
    
//     cached.conn = await cached.promise;
//     return cached.conn;
// }

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
                host: "localhost",
                port: 3306,
                username: "helpdesk",
                password: "Heslo123",
                database: "helpdesk",
                entities: [
                    Accounts,
                    Sessions,
                    Tags,
                    TicketMessages,
                    Tickets,
                    TicketTags,
                    Users,
                    VerificationRequests
                ]
            });
        })();
    }

    return connectionReadyPromise;
}
