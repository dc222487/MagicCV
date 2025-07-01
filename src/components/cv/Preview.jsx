import React from 'react';
import useResumeAnalytics from '../../hooks/useResumeAnalytics';

const Preview = ({ data }) => {
  const analytics = useResumeAnalytics(data);
  
  return (
    <div id="resume-preview" className="preview">
      <header>
        <h1>{data.general.name}</h1>
        <div className="contact-info">
          <p>{data.general.email}</p>
          <p>{data.general.phone}</p>
        </div>
      </header>
      
      {data.general.summary && (
        <section className="summary">
          <h2>Professional Summary</h2>
          <p>{data.general.summary}</p>
        </section>
      )}
      
      {data.education.length > 0 && (
        <section className="education">
          <h2>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.school}</h3>
              <p>{edu.degree}</p>
              <p>{edu.start} - {edu.end}</p>
            </div>
          ))}
        </section>
      )}
      
      {data.experience.length > 0 && (
        <section className="experience">
          <h2>Work Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3>{exp.company}</h3>
                <p>{exp.start} - {exp.end}</p>
              </div>
              <p className="position">{exp.position}</p>
              <p className="responsibilities">{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      )}
      
      {data.skills.length > 0 && (
        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-container">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}
      
      <div className="analytics">
        <h3>Resume Analytics</h3>
        <div className="score-card">
          <div className="score">
            <span>{analytics.atsScore}%</span>
            <small>ATS Score</small>
          </div>
          <div className="score">
            <span>{analytics.readability}%</span>
            <small>Readability</small>
          </div>
          <div className="score">
            <span>{analytics.wordCount}</span>
            <small>Word Count</small>
          </div>
        </div>
        
        {analytics.improvementTips.length > 0 && (
          <div className="improvement-tips">
            <h4>Improvement Suggestions</h4>
            <ul>
              {analytics.improvementTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;