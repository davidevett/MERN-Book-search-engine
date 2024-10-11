const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    bookCount: Number
    savedBooks: [Book]!
  }

  type Book {
    bookId: Stringd
    title: String
    author: String
    description: String
    link: String
    image: String
  }

  type Auth {
    token: String
    user: User
  }
    
  type Query {
    me: User
  }
    
  type Mutation {
    addUser(name: String, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    saveBook(userId: ID!, bookId: String!): User
    removeUser(userId: ID!): User
    removeBook(userId: ID!, bookId: String!): User
  }
`;

module.exports = typeDefs;
