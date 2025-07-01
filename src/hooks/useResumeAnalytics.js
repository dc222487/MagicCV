import { useState, useEffect } from 'react';
import { calculateATSScore, analyzeReadability } from '../utils/resumeParser';

const useResumeAnalytics = (resumeData) => {
  const [analytics, setAnalytics] = useState({
    atsScore: 0,
    readability: 0,
    wordCount: 0,
    improvementTips: []
  });
  
  useEffect(() => {
    if (!resumeData) return;
    
    const atsScore = calculateATSScore(resumeData);
    const summaryReadability = analyzeReadability(resumeData.general?.summary);
    const experienceReadability = resumeData.experience.reduce((acc, exp) => 
      acc + analyzeReadability(exp.responsibilities), 0) / Math.max(1, resumeData.experience.length);
    
    const readability = Math.round((summaryReadability + experienceReadability) / 2);
    
    // Count words
    const wordCount = JSON.stringify(resumeData)
      .split(/\s+/)
      .filter(word => word.length > 2).length;
    
    // Generate tips
    const tips = [];
    if (atsScore < 70) tips.push('Add more relevant skills to increase ATS compatibility');
    if (readability < 60) tips.push('Simplify complex sentences for better readability');
    if (!resumeData.general.summary) tips.push('Add a professional summary to strengthen your profile');
    if (resumeData.experience.length === 0) tips.push('Add work experience to showcase your background');
    
    setAnalytics({
      atsScore,
      readability,
      wordCount,
      improvementTips: tips
    });
  }, [resumeData]);
  
  return analytics;
};

export default useResumeAnalytics;