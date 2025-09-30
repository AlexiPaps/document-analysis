import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { GET_DOCUMENTS, UPLOAD_DOCUMENT } from '../graphql/queries';

interface Document {
    id: string;
    name: string;
    content: string;
}

const DocumentUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [uploadDocument, { loading }] = useMutation<{ uploadDocument: Document }>(UPLOAD_DOCUMENT, {
        refetchQueries: [{ query: GET_DOCUMENTS }], // Refetch GET_DOCUMENTS after mutation
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setName(e.target.files[0].name);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        try {
            let content = '';
            if (file.type === 'text/plain') {
                content = await file.text();
            } else {
                setError('Unsupported file type. Use .txt');
                return;
            }

            const { data } = await uploadDocument({
                variables: { name, content },
            });

            if (data?.uploadDocument) {
                setFile(null);
                setName('');
                setError('');
                alert('Document uploaded successfully!');
            }
        } catch (err) {
            setError('Failed to upload document');
            console.error(err);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>1. Upload Document</h2>
            <p>Upload a .txt file containing text. The text in the file will be uploaded to the db and be summarized using OpenAI.</p>
            <p>Furthermore the summary will be uploaded to Pinecone as an embedding.</p>
            <input style={{ width: '245px' }} type="file" accept=".txt" onChange={handleFileChange} />
            <button style={{ marginLeft: '10px' }} onClick={handleUpload} disabled={loading || !file}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ marginTop: '5px', height: '1px', borderBottom: 'solid 1px white' }}></div>
        </div>
    );
};

export default DocumentUploader;