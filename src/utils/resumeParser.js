// Utility functions for resume analysis
export const calculateATSScore = (resumeData) => {
  let score = 0;
  const { general, education, experience, skills } = resumeData;
  
  // Scoring criteria
  if (general.name && general.email) score += 10;
  if (general.summary && general.summary.length > 40) score += 15;
  if (education.length >= 1) score += 15;
  if (experience.length >= 1) score += 20;
  if (skills.length >= 5) score += 20;
  
  // Keyword density bonus
  const keywords = ['react', 'javascript', 'node', 'api', 'database'];
  const contentString = JSON.stringify(resumeData).toLowerCase();
  const keywordCount = keywords.filter(kw => contentString.includes(kw)).length;
  score += keywordCount * 5;
  
  return Math.min(score, 100);
};

export const analyzeReadability = (text) => {
  if (!text) return 0;
  
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const complexWordPattern = /[a-z]{3,}[aeiou]{0,3}[^aeiou\s]{3,}/gi;
  const complexWords = (text.match(complexWordPattern) || []).length;
  
  if (words === 0 || sentences === 0) return 100;
  
  const flesch = 206.835 - 
    (1.015 * (words / sentences)) - 
    (84.6 * (complexWords / words));
  
  return Math.max(0, Math.min(100, flesch));
};