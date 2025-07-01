import React, { useState, useEffect } from 'react';
import GeneralInfo from './components/cv/GeneralInfo';
import Education from './components/cv/Education';
import Experience from './components/cv/Experience';
import Skills from './components/cv/Skills';
import Preview from './components/cv/Preview';
import TemplateSelector from './components/cv/TemplateSelector';
import ExportControls from './components/export/ExportControls';
import AISuggestions from './components/ai/AISuggestions';
import './styles/components/App.css';

const App = () => {
  const [resumeData, setResumeData] = useState({
    general: { name: '', email: '', phone: '', summary: '' },
    education: [],
    experience: [],
    skills: [],
    meta: { theme: 'modern' }
  });
  
  const [activeTab, setActiveTab] = useState('editor');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      setDarkMode(isSystemDark);
    }
  }, []);

    // Save dark mode preference and update document class
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
        if (darkMode) {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };


  const updateGeneral = (data) => {
    setResumeData(prev => ({
      ...prev,
      general: { ...prev.general, ...data }
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), school: '', degree: '', start: '', end: '' }
      ]
    }));
  };

  const updateEducation = (id, data) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: Date.now(), company: '', position: '', responsibilities: '', start: '', end: '' }
      ]
    }));
  };

  const updateExperience = (id, data) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

    const deleteEducation = (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
        setResumeData(prev => ({
        ...prev,
        education: prev.education.filter(edu => edu.id !== id)
        }));
    }
    };

    const deleteExperience = (id) => {
    if (window.confirm('Are you sure you want to delete this work experience?')) {
        setResumeData(prev => ({
        ...prev,
        experience: prev.experience.filter(exp => exp.id !== id)
        }));
    }
    };

  const updateSkills = (skills) => {
    setResumeData(prev => ({
      ...prev,
      skills
    }));
  };

  const changeTheme = (theme) => {
    setResumeData(prev => ({
      ...prev,
      meta: { ...prev.meta, theme }
    }));
  };

  return (
    <div className={`app theme-${resumeData.meta.theme} ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <div className="header-left">
          <h1>MagicCV - An Auto CV Builder</h1>
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <TemplateSelector currentTheme={resumeData.meta.theme} onChange={changeTheme} />
      </header>
      
      <div className="tabs">
        <button 
          className={activeTab === 'editor' ? 'active' : ''}
          onClick={() => setActiveTab('editor')}
        >
          Editor
        </button>
        <button 
          className={activeTab === 'preview' ? 'active' : ''}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button 
          className={activeTab === 'ai' ? 'active' : ''}
          onClick={() => setActiveTab('ai')}
        >
          AI Assistant
        </button>
      </div>
      
      {activeTab === 'editor' && (
        <div className="editor">
          <GeneralInfo data={resumeData.general} onChange={updateGeneral} />
          <Education 
            items={resumeData.education} 
            onAdd={addEducation} 
            onChange={updateEducation} 
            onDelete={deleteEducation} 
          />
          <Experience 
            items={resumeData.experience} 
            onAdd={addExperience} 
            onChange={updateExperience} 
            onDelete={deleteExperience} 
          />
          <Skills skills={resumeData.skills} onChange={updateSkills} />
        </div>
      )}
      
      {activeTab === 'preview' && (
        <div className="preview-container">
          <Preview data={resumeData} />
          <ExportControls elementId="resume-preview" />
        </div>
      )}
      
      {activeTab === 'ai' && (
        <AISuggestions 
          resumeData={resumeData} 
          suggestions={aiSuggestions} 
          setSuggestions={setAiSuggestions} 
          applySuggestion={(suggestion) => {
            // Apply AI suggestion to resume
            if (suggestion.type === 'skill') {
              updateSkills([...resumeData.skills, suggestion.value]);
            }
            // Add more cases as needed
          }}
        />
      )}
    </div>
  );
};

export default App;