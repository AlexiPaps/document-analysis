import { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client/react';
import { GET_DOCUMENTS, SEARCH_DOCUMENTS } from '../graphql/queries';
import DocumentModal from './DocumentModal';
import SearchIcon from './SearchIcon';
import { TOPK } from '../utils/constants';

interface Document {
    id: string;
    name: string;
    content: string;
    summary: string;
}

interface SearchResult {
    id: string;
    score: number;
}

const DocumentList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const { data: docData, loading: docLoading } = useQuery<{ documents: Document[] }>(GET_DOCUMENTS);
    const [executeSearch, { data: searchData, loading: searchLoading, error: searchError }] = useLazyQuery<{
        searchDocuments: SearchResult[];
    }>(SEARCH_DOCUMENTS);

    const handleSearch = async () => {
        if (searchQuery) {
            try {
                await executeSearch({ variables: { query: searchQuery.trim(), topK: TOPK } })
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleOpenModal = (document: Document) => {
        setSelectedDocument(document || null);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>2. Search Documents</h2>
            <p>Search for information in the uploaded documents.</p>
            <p>The document most likely to contain the information you seek, will be shown first.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <textarea
                    style={{ width: '240px' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in documents..."
                />
                <button style={{ marginLeft: '10px' }} onClick={() => handleSearch()} disabled={searchLoading}>
                    Search
                </button>
            </div>

            <h4>Search Results</h4>
            {searchQuery && (
                <div>
                    {searchLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul style={{ textAlign: 'left' }}>
                            {searchData?.searchDocuments.map((result) => {
                                const doc = docData?.documents.find((d) => d.id === result.id);
                                return (
                                    <li key={result.id}>
                                        Score: {result.score},
                                        Name: {doc?.name || 'Unknown'}
                                        {doc &&
                                            <SearchIcon onClick={() => handleOpenModal(doc)} style={{ marginLeft: '10px' }} />
                                        }
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            )
            }

            <div style={{ marginTop: '5px', height: '1px', borderBottom: 'solid 1px white' }}></div>

            <div>
                <h3>All Documents</h3>
                {docLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul style={{ textAlign: 'left' }}>
                        {docData?.documents.map((doc) => (
                            <li key={doc.id}>
                                {doc.name}
                                {doc &&
                                    <SearchIcon onClick={() => handleOpenModal(doc)} style={{ marginLeft: '10px' }} />
                                }
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <DocumentModal
                isOpen={!!selectedDocument}
                onClose={() => setSelectedDocument(null)}
                document={selectedDocument}
            />
        </div >
    );
};

export default DocumentList;