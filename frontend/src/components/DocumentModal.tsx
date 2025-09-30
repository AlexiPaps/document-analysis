import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/DocumentModal.css';

interface DocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    document: { id: string; name: string; content: string; summary?: string } | null;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ isOpen, onClose, document }) => {
    if (!isOpen || !document) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-close" onClick={onClose}>
                    &times;
                </div>
                <h2>{document.name}</h2>
                <p><strong>ID:</strong> {document.id}</p>
                <span style={{ textAlign: 'left' }}>
                    <p><strong>Summary:</strong></p>
                    <ReactMarkdown>{document.summary || 'No summary'}</ReactMarkdown>
                    <div className="modal-content-scroll">
                        <p><strong>Content:</strong></p>
                        <ReactMarkdown>{document.content || 'No summary'}</ReactMarkdown>
                    </div>
                </span>

            </div>
        </div>
    );
};

export default DocumentModal;