import { useState } from 'react';

// Mock implementation - in a real app, you'd call an actual API
const useAISuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  
  const fetchSuggestions = async ({ context, currentResume }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response based on context
    const mockSuggestions = [];
    
    if (context.toLowerCase().includes('skill')) {
      mockSuggestions.push({
        id: Date.now(),
        type: 'skill',
        title: 'Add Relevant Skills',
        description: 'Based on your experience, consider adding these skills: React, Node.js, TypeScript',
        value: ['React', 'Node.js', 'TypeScript']
      });
    }
    
    if (context.toLowerCase().includes('summary') || context.toLowerCase().includes('about')) {
      mockSuggestions.push({
        id: Date.now() + 1,
        type: 'summary',
        title: 'Improve Professional Summary',
        description: 'Try this more impactful summary: "Seasoned software developer with 5+ years of experience building scalable web applications using modern JavaScript frameworks."',
        value: 'Seasoned software developer with 5+ years of experience building scalable web applications using modern JavaScript frameworks.'
      });
    }
    
    if (context.toLowerCase().includes('action')) {
      mockSuggestions.push({
        id: Date.now() + 2,
        type: 'experience',
        title: 'Use Action Verbs',
        description: 'Start bullet points with strong action verbs like: Developed, Implemented, Led, Optimized, Managed',
        value: null
      });
    }
    
    return mockSuggestions;
  };
  
  return {
    suggestions,
    fetchSuggestions
  };
};

export default useAISuggestions;