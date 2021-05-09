import { argsToArgsConfig } from "graphql/type/definition";
import { getRepository } from "typeorm";
import { Tags } from "../src/db/entities/Tags";
import { Tickets } from "../src/db/entities/Tickets";
import { Users } from "../src/db/entities/Users";
import { dbConnect } from "../utils/dbconnect";

const Query = {
  hello: (_parent, _args, _context, _info) => "Hello world",
  users: async (_parent, _args, _context, _info) => {
    await dbConnect();
    return await getRepository(Users).find();
  },
  ticket: async (_parent, { id }, _context, _info) => {
    await dbConnect();
    return await getRepository(Tickets).findOne({
      where: { id },
      relations: [
        "author",
        "ticketTags",
        "ticketTags.tag",
        "ticketMessages",
        "ticketMessages.author",
      ],
    });
  },
  tickets: async (_parent, { first, skip }, _context, _info) => {
    await dbConnect();
    return await getRepository(Tickets).find({
      take: Math.min(first, 50),
      skip,
      relations: [
        "author",
        "ticketTags",
        "ticketTags.tag",
        "ticketMessages",
        "ticketMessages.author",
      ],
    });
  },
  tags: async (_parent, _args, _context, _info) => {
    await dbConnect();
    return await getRepository(Tags).find();
  },
};

const Mutation = {};

const Ticket = {
  ticketTags: (ticket) => ticket.ticketTags.map((x) => x.tag),
};

export default { Query, Ticket };
