import { GraphQLServer } from 'graphql-yoga';

const links = [{
  id: '1',
  description: 'Link 1'
}];
let link_length = links.length;

const typeDefs = `
 type Query {
   info: String!,
   feed: [Link!]!
 }

 type Mutation {
   post(url: String!, description: String!): Link
 }

 type Link {
   id: String!,
   description: String!
 }
`;

const resolvers = {
  Query: {
    info: () => `result of info query`,
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      link_length += 1;
      const link = JSON.parse(JSON.stringify(args));
      link.id = link_length;
      links.push(link);
      return link;
    }
  }
};

const app = new GraphQLServer({
  typeDefs,
  resolvers
});

app.start(() => {
  console.log(`Server is running at http://localhost:4000/`)
})