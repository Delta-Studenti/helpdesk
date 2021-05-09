import { gql } from "@apollo/client";

export default gql`
    type Query {
        hello: String!
        users: [User!]!
        tickets: [Ticket!]!
        tags: [Tag!]!
    }



    type Tag {
        id: ID!
        title: String!
    }

    type Ticket {
        id: ID!
        title: String!
        created: String!
        status: Int!
        author: User!
        ticketMessages: [TicketMessage!]!
        ticketTags: [Tag!]!
    }

    type TicketMessage {
        id: ID!
        messages: String!
        created: String!
        author: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        email_verified: String
        created_at: String!
        updated_at: String!
    }
`;
