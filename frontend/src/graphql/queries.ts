// frontend/src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_DOCUMENTS = gql`
  query GetDocuments {
    documents {
      id
      name
      content
      summary
    }
  }
`;

export const UPLOAD_DOCUMENT = gql`
  mutation UploadDocument($name: String!, $content: String!) {
    uploadDocument(name: $name, content: $content) {
      id
      name
      content
    }
  }
`;

export const SEARCH_DOCUMENTS = gql`
  query SearchDocuments($query: String!, $topK: Int) {
    searchDocuments(query: $query, topK: $topK) {
      id
      score
    }
  }
`;