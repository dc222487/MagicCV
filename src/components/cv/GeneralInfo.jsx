import React, { useState } from 'react';
import '../../styles/components/GeneralInfo.css';

const GeneralInfo = ({ data, onChange }) => {
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    onChange({
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="general-info">
      <div className="section-header">
        <h2>Personal Information</h2>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
      
      {isEditing ? (
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Professional Summary</label>
            <textarea
              name="summary"
              value={data.summary}
              onChange={handleChange}
              placeholder="Experienced professional with..."
              rows={4}
            />
          </div>
        </form>
      ) : (
        <div className="display-info">
          <h3>{data.name}</h3>
          <p>{data.email} | {data.phone}</p>
          <p className="summary">{data.summary}</p>
        </div>
      )}
    </section>
  );
};

export default GeneralInfo;