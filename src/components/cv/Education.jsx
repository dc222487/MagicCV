import React, { useState } from 'react';

const Education = ({ items, onAdd, onChange, onDelete }) => {
  return (
    <section className="education">
      <div className="section-header">
        <h2>Education</h2>
        <button onClick={onAdd}>+ Add Education</button>
      </div>
      
      {items.map((edu) => (
        <EducationItem 
          key={edu.id} 
          data={edu} 
          onChange={(data) => onChange(edu.id, data)} 
          onDelete={() => onDelete(edu.id)}
        />
      ))}
    </section>
  );
};

const EducationItem = ({ data, onChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    onChange({
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="education-item">
      {isEditing ? (
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>School/University</label>
              <input
                type="text"
                name="school"
                value={data.school}
                onChange={handleChange}
                placeholder="University of Technology"
              />
            </div>
            
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={data.degree}
                onChange={handleChange}
                placeholder="Bachelor of Science"
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
          
          <div className="education-actions">
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
          <h3>{data.school}</h3>
          <p>{data.degree}</p>
          <p>{data.start} - {data.end || 'Present'}</p>
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

export default Education;