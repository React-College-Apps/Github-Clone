import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface FileViewerProps {
    fileContent: string;  // Renamed for clarity
    language: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ fileContent, language }) => {
    return (
        <SyntaxHighlighter language={language} style={docco}>
            {fileContent}
        </SyntaxHighlighter>
    );
};

export default FileViewer;
