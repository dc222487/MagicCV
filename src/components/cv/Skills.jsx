import React, { useState } from 'react';
import '../../styles/components/Skills.css';

const Skills = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [editingSkill, setEditingSkill] = useState(null);
  const [editSkillText, setEditSkillText] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const startEditing = (index, skill) => {
    setEditingSkill(index);
    setEditSkillText(skill);
  };

  const saveEdit = (index) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = editSkillText.trim();
    onChange(updatedSkills);
    setEditingSkill(null);
    setEditSkillText('');
  };

  const cancelEdit = () => {
    setEditingSkill(null);
    setEditSkillText('');
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <section className="skills-section">
      <div className="section-header">
        <h2>Skills</h2>
      </div>

      <div className="skills-input-container">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, handleAddSkill)}
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          className="skill-input"
        />
        <button 
          onClick={handleAddSkill}
          className="add-skill-btn"
          disabled={!newSkill.trim()}
        >
          Add Skill
        </button>
      </div>

      <div className="skills-container">
        {skills.length > 0 ? (
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                {editingSkill === index ? (
                  <div className="skill-edit-container">
                    <input
                      type="text"
                      value={editSkillText}
                      onChange={(e) => setEditSkillText(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, () => saveEdit(index))}
                      autoFocus
                      className="skill-edit-input"
                    />
                    <div className="skill-edit-buttons">
                      <button 
                        onClick={() => saveEdit(index)}
                        className="save-skill-btn"
                        disabled={!editSkillText.trim()}
                      >
                        Save
                      </button>
                      <button 
                        onClick={cancelEdit}
                        className="cancel-skill-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="skill-display">
                    <span className="skill-text">{skill}</span>
                    <div className="skill-actions">
                      <button 
                        onClick={() => startEditing(index, skill)}
                        className="edit-skill-btn"
                        aria-label="Edit skill"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteSkill(index)}
                        className="delete-skill-btn"
                        aria-label="Delete skill"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-skills-message">
            <p>No skills added yet. Add your first skill above!</p>
            <div className="skill-suggestions">
              <p>Suggestions:</p>
              <div className="suggestion-tags">
                <span>JavaScript</span>
                <span>React</span>
                <span>CSS</span>
                <span>Project Management</span>
                <span>Communication</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {skills.length > 0 && (
        <div className="skills-tools">
          <button 
            className="reorder-skills-btn"
            onClick={() => {
              // Create a shuffled copy of skills
              const shuffled = [...skills].sort(() => Math.random() - 0.5);
              onChange(shuffled);
            }}
          >
            🔀 Randomize Order
          </button>
          <button 
            className="clear-skills-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all skills?')) {
                onChange([]);
              }
            }}
          >
            🗑️ Clear All Skills
          </button>
        </div>
      )}
    </section>
  );
};

export default Skills;