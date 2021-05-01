// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Connection, createConnection, getRepository } from "typeorm";
import { Accounts } from "../../src/db/entities/Accounts";
import { Sessions } from "../../src/db/entities/Sessions";
import { Tags } from "../../src/db/entities/Tags";
import { TicketMessages } from "../../src/db/entities/TicketMessages";
import { Tickets } from "../../src/db/entities/Tickets";
import { TicketTags } from "../../src/db/entities/TicketTags";
import { Users } from "../../src/db/entities/Users";
import { VerificationRequests } from "../../src/db/entities/VerificationRequests";
import { dbConnect } from "../../utils/dbconnect";

export default async (req, res) => {
  await dbConnect();

  const users = await getRepository(Users).find();
  // const users = await data.manager.getRepository(Users).find();
  
  res.status(200).json(users);
}
