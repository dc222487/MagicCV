import React, { useRef } from 'react';
import { exportToPDF, exportToMarkdown } from '../../utils/pdfGenerator';

const ExportControls = ({ elementId }) => {
  const exportPDF = () => {
    exportToPDF(elementId, 'resume.pdf');
  };
  
  const exportMD = () => {
    exportToMarkdown(elementId, 'resume.md');
  };
  
  return (
    <div className="export-controls">
      <h3>Export Resume</h3>
      <div className="export-buttons">
        <button onClick={exportPDF}>PDF</button>
        <button onClick={exportMD}>Markdown</button>
        <button onClick={() => window.print()}>Print</button>
        <button onClick={() => alert('LinkedIn export would go here')}>
          LinkedIn
        </button>
      </div>
      
      <div className="qr-section">
        <h4>Share Your Resume</h4>
        <div className="qr-placeholder">
          {/* In a real app, you'd use a QR code generator */}
          <div className="qr-code-mock"></div>
          <p>Scan to view online</p>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;