import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Table from 'react-bootstrap/Table'
import { ALL_AUTHORS, ADD_AUTHOR } from './graphql'

const Home = () => {
  const {
    data: allAuthorsData, loading, error: allAuthorsError,
  } = useQuery(ALL_AUTHORS)
  if (allAuthorsError) {
    throw new Error('query failed')
  }

  const [addAuthor, { error: addAuthorError, loading: addAuthorLoading }] = useMutation(ADD_AUTHOR,
    {
      update: (client, { data }) => {
        try {
          const temp = client.readQuery({ query: ALL_AUTHORS })
          temp.allAuthors = [...temp.allAuthors, data.addAuthor]

          client.writeQuery({ query: ALL_AUTHORS, temp })
        } catch (error) {
          throw new Error('update failed')
        }
      },
      variables: {
        input: {
          firstName: 'Alice',
          lastName: 'Smith',
          age: 19,
          email: 'a@gmail.com',
          numBooksPublished: 5,
        },

      },
    })
  if (addAuthorError) {
    throw new Error('add author failed')
  }
  return (
    <>
      {loading || addAuthorLoading ? 'loading...'
        : (
          <>
            <h1>Authors</h1>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Number of Books Published</th>
                  <th>Books</th>
                </tr>
              </thead>
              <tbody>
                {allAuthorsData.allAuthors.map(author => (
                  <tr>
                    <td>{author.firstName}</td>
                    <td>{author.lastName}</td>
                    <td>{author.age}</td>
                    <td>{author.email}</td>
                    <td>{author.numBooksPublished}</td>
                    <td>{author.books ? author.books.map(x => x.title) : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <button type="button" onClick={addAuthor}>ADD AUTHOR</button>
          </>
        )}

      {/* {loading || addAuthorLoading ? 'loading...' : allAuthorsData.allAuthors.map(author => (
        <>
          <p>{author.firstName}</p>
          <p>{author.lastName}</p>
          <p>{author.books ? author.books.map(x => x.title) : ''}</p>
        </>
      ))} */}
    </>
  )
}


export default Home
