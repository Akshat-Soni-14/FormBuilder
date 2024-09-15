import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getForms } from '../api/formApi'; // Adjust the path as necessary
import '../styles/ResponsesPage.css';

const ResponsesPage = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getForms();
        setForms(data);
      } catch (error) {
        setError('Error fetching forms.');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="response-page-container">
      <h1>Select a Form to View Responses</h1>
      <div className="form-list">
        {forms.map((form) => (
          <div key={form._id} className="form-card">
            <h2>{form.title}</h2>
            <Link to={`/responses/${form._id}`}>View Responses</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsesPage;
