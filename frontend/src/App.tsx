// frontend/src/App.tsx
import { ApolloProvider } from '@apollo/client/react';
import client from './apollo-client';
import DocumentUploader from './components/DocumentUploader';
import DocumentList from './components/DocumentList';

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ padding: '20px' }}>
        <h1>Legal Document Analysis</h1>
        <DocumentUploader />
        <DocumentList />
      </div>
    </ApolloProvider>
  );
}

export default App;