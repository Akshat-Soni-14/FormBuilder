// src/components/CreateForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createForm } from '../api/formApi';
import '../styles/CreateForm.css';

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [field, setField] = useState({ label: '', type: 'text', placeholder: '', required: false });
  const navigate = useNavigate();

  const handleAddField = () => {
    setFields([...fields, field]);
    setField({ label: '', type: 'text', placeholder: '', required: false });
  };

  const handleSubmit = async () => {
    try {
      await createForm({ title, fields });
      navigate('/');
    } catch (error) {
      console.error('Error creating form:', error);
    }
  };

  return (
    <div className="create-form-container">
      <h1>Create Form</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
        required
      />
      <div>
        <input
          type="text"
          value={field.label}
          onChange={(e) => setField({ ...field, label: e.target.value })}
          placeholder="Field Label"
        />
        <input
          type="text"
          value={field.placeholder}
          onChange={(e) => setField({ ...field, placeholder: e.target.value })}
          placeholder="Placeholder"
        />
        <select
          value={field.type}
          onChange={(e) => setField({ ...field, type: e.target.value })}
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
        </select>
        <label>
          Required
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => setField({ ...field, required: e.target.checked })}
          />
        </label>
        <button type="button" onClick={handleAddField}>Add Field</button>
      </div>
      <div>
        {fields.map((f, index) => (
          <div key={index}>
            {f.label} ({f.type}) {f.required && <span>*</span>}
          </div>
        ))}
      </div>
      <button type="button" onClick={handleSubmit}>Save Form</button>
    </div>
  );
};

export default CreateForm;
