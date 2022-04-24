import { gql } from "@apollo/client";

export const GET_ME = gql`
query {
	me{
    _id
    username
    email
    bookCount
    savedBooks{
      authors
      description
      bookId
      title
      image
      link
    }
  }
}
`