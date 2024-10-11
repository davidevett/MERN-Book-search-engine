import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    } 
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $bookId: String!){
    saveBook(userId: $userId, bookId: $bookId) {
      _id
      user {
        _id
        savedBooks {
          _id
          title
          author
        }
      }
    }
  } 
`;

export const REMOVE_BOOK = gql`
  mutations removeBook($userId: ID!, $bookId: String!){
    removeBook(userId: $userId, bookId:$Id) {
      _id
      user {
        _id
        savedBooks {
          _id
          title
          author
        }
      }
    }
  }
`;