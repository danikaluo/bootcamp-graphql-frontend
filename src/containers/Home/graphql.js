import gql from 'graphql-tag'

export const ALL_AUTHORS = gql`
    query allauthors {
    allAuthors {
        firstName
        lastName
        age
        email
        numBooksPublished
        books {
        title
        }
    }
    }  
`

export const ADD_AUTHOR = gql`
    mutation addAuthor ($input: addAuthorInput) {
    addAuthor (input: $input) {
        firstName
        lastName
        age
        email
        numBooksPublished
    }
    }
`
