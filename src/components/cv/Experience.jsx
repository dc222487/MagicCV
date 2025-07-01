import React, { useState } from 'react';

const Experience = ({ items, onAdd, onChange, onDelete }) => {
  return (
    <section className="experience">
      <div className="section-header">
        <h2>Work Experience</h2>
        <button onClick={onAdd}>+ Add Experience</button>
      </div>
      
      {items.map((exp) => (
        <ExperienceItem 
          key={exp.id} 
          data={exp} 
          onChange={(data) => onChange(exp.id, data)} 
          onDelete={() => onDelete(exp.id)}
        />
      ))}
    </section>
  );
};

const ExperienceItem = ({ data, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    onChange({
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="experience-item">
      {isEditing ? (
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={data.company}
                onChange={handleChange}
                placeholder="Tech Innovations Inc."
              />
            </div>
            
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={data.position}
                onChange={handleChange}
                placeholder="Senior Developer"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                name="start"
                value={data.start}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                name="end"
                value={data.end}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Responsibilities & Achievements</label>
            <textarea
              name="responsibilities"
              value={data.responsibilities}
              onChange={handleChange}
              placeholder="Led development of..."
              rows={4}
            />
          </div>
          
          <div className="experience-actions">
            <button type="button" onClick={() => setIsEditing(false)}>
              Save
            </button>
            <button 
              type="button" 
              className="delete-btn"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </form>
      ) : (
        <div className="display-info">
          <h3>{data.company}</h3>
          <p>{data.position}</p>
          <p>{data.start} - {data.end || 'Present'}</p>
          <p className="responsibilities">{data.responsibilities}</p>
          <div className="display-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button 
              className="delete-btn"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;