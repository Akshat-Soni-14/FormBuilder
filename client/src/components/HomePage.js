// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getForms } from '../api/formApi';
import '../styles/HomePage.css';

const HomePage = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getForms();
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };
    fetchForms();
  }, []);

  return (
    <div className="home-container">
      <h1>Forms</h1>
      <Link to="/form/create" className="create-form-button">Create Form</Link>
      <div className="form-list">
        {forms.map((form) => (
          <div key={form._id} className="form-card">
            <h2>{form.title}</h2>
            <Link to={`/form/${form._id}`}>Fill Form</Link>
          </div>
        ))}
      </div>
      <Link to="/responses" className="view-responses-button">View Responses</Link>
    </div>
  );
};

export default HomePage;
