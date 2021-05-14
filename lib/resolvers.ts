import { getRepository } from "typeorm";
import { Tags } from "../src/db/entities/Tags";
import { TicketMessages } from "../src/db/entities/TicketMessages";
import { Tickets } from "../src/db/entities/Tickets";
import { TicketTags } from "../src/db/entities/TicketTags";
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
    return await getRepository(Tickets).findOne({
      where: { id },
      relations,
    });
  },
  tickets: async (_parent, { take, skip, authorId }, _context, { fieldNodes }) => {
    await dbConnect();
    const relations = getRelations(fieldNodes.find(x => x.name.value === "tickets").selectionSet.selections);
    const where = authorId ? { authorId } : {};
    return await getRepository(Tickets).find({
      where,
      take: Math.min(take, 50),
      skip,
      relations
    });
  },
  ticketsCount: async (_parent, _args, _context, _info) => {
    await dbConnect();
    return getRepository(Tickets).count();
  },
  tags: async (_parent, _args, _context, _info) => {
    await dbConnect();
    return await getRepository(Tags).find();
  },
};

const Mutation = {
  createTicket: async (_parent, { input }, _context, _info) => {
    await dbConnect();
    const userId = 1;

    // Kontrola tagů
    if ((await getRepository(Tags).find({where: input.tags.map(id => { return { id }})})).length !== input.tags.length) return null;
    
    const ticket = new Tickets();
    ticket.authorId = userId;
    ticket.title = input.title;
    const newTicket = await getRepository(Tickets).save(ticket);

    const message = new TicketMessages();
    message.authorId = userId;
    message.messages = input.message;
    message.ticketId = newTicket.id;
    await getRepository(TicketMessages).save(message);

    await Promise.all(input.tags.map(x => {
      const tag = new TicketTags();
      tag.tagId = x;
      tag.ticketId = newTicket.id;
      return getRepository(TicketTags).save(tag);
    }));
    return newTicket.id;
  },
  createTicketMessage: async (_parent, { input }, _context, _info) => {
    await dbConnect();
    const userId = 1;

    // console.log(input);
    const message = new TicketMessages();
    message.messages = input.message;
    message.ticketId = input.ticketId;
    message.authorId = userId;
    const newMessage = await getRepository(TicketMessages).save(message);
    newMessage.author = await getRepository(Users).findOne({where: {id: newMessage.authorId}});
    return newMessage;
  },
  createTag: async (_parent, { input }, _context, _info) => {
    await dbConnect();
    const tag = new Tags();
    tag.title = input.title;
    const newTag = await getRepository(Tags).save(tag);
    return newTag.id;
  }
};

const Ticket = {
  ticketTags: (ticket) => ticket.ticketTags.map((x) => x.tag),
};

export default { Query, Mutation, Ticket };
