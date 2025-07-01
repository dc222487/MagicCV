import React from 'react';

const TemplateSelector = ({ currentTheme, onChange }) => {
  const themes = [
    { id: 'modern', name: 'Modern', description: 'Clean and professional' },
    { id: 'classic', name: 'Classic', description: 'Traditional layout' },
    { id: 'creative', name: 'Creative', description: 'For design-oriented fields' }
  ];

  return (
    <div className="template-selector">
      <label>Template:</label>
      <div className="template-options">
        {themes.map(theme => (
          <div 
            key={theme.id}
            className={`template-option ${currentTheme === theme.id ? 'active' : ''}`}
            onClick={() => onChange(theme.id)}
          >
            <div className={`template-preview ${theme.id}`}>
              <div className="preview-header"></div>
              <div className="preview-section"></div>
              <div className="preview-section"></div>
            </div>
            <div className="template-info">
              <div className="template-name">{theme.name}</div>
              <div className="template-description">{theme.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;