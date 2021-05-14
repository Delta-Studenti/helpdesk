import { getRepository } from "typeorm";
import { Tags } from "../src/db/entities/Tags";
import { Tickets } from "../src/db/entities/Tickets";
import { Users } from "../src/db/entities/Users";
import { dbConnect } from "../utils/dbconnect";
import { getRelations } from "./get-relations";

const Query = {
  hello: (_parent, _args, _context, _info) => "Hello world",
  users: async (_parent, _args, _context, _info) => {
    await dbConnect();
    return await getRepository(Users).find();
  },
  ticket: async (_parent, { id }, _context, { fieldNodes }) => {
    await dbConnect();
    const relations = getRelations(fieldNodes.find(x => x.name.value === "ticket").selectionSet.selections);
    const a = await getRepository(Tickets).findOne({
      where: { id },
      relations,
    });
    return a;
  },
  tickets: async (_parent, { first, skip, authorId }, _context, { fieldNodes }) => {
    await dbConnect();
    const relations = getRelations(fieldNodes.find(x => x.name.value === "tickets").selectionSet.selections);
    const where = authorId ? { "authorId": authorId } : {};
    return await getRepository(Tickets).find({
      where,
      take: Math.min(first, 50),
      skip,
      relations
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
