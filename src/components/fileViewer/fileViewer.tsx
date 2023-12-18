import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Import a Prism style theme, you can choose the one you like
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface FileViewerProps {
    fileContent: string;
    language: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ fileContent, language }) => {
    return (
        <SyntaxHighlighter  language={language} style={prism}>
            {fileContent}
        </SyntaxHighlighter>
    );
};

export default FileViewer;
