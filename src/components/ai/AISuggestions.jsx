import React, { useState } from 'react';
import useAISuggestions from '../../hooks/useAISuggestions';

const AISuggestions = ({ resumeData, suggestions, setSuggestions, applySuggestion }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { fetchSuggestions } = useAISuggestions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const newSuggestions = await fetchSuggestions({
        context: input,
        currentResume: resumeData
      });
      setSuggestions([...suggestions, ...newSuggestions]);
    } catch (error) {
      console.error("AI Suggestion Error:", error);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="ai-suggestions">
      <h2>AI Resume Assistant</h2>
      <p>Get intelligent suggestions to improve your resume</p>
      
      <form onSubmit={handleSubmit} className="ai-prompt">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for suggestions (e.g., 'Improve my summary', 'Add skills for web development')"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Generating...' : 'Get Suggestions'}
        </button>
      </form>
      
      <div className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-card">
            <h4>{suggestion.title}</h4>
            <p>{suggestion.description}</p>
            <button onClick={() => applySuggestion(suggestion)}>
              Apply to Resume
            </button>
          </div>
        ))}
        
        {suggestions.length === 0 && !isLoading && (
          <div className="empty-state">
            <p>No suggestions yet. Ask the AI assistant for recommendations!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;