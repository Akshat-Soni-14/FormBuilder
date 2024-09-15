import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFormById, submitResponse } from '../api/formApi';
import '../styles/ViewForm.css';

const ViewForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const data = await getFormById(id);
        setForm(data);
      } catch (error) {
        setError('Error fetching form.');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update the responses object using the field's _id
    setResponses((prevResponses) => ({
      ...prevResponses,
      [name]: value, // Field ID is used as the key here
    }));
  };

  const handleSubmit = async () => {
    try {
      // Submit the response by sending the form field IDs and their corresponding values
      await submitResponse(id, { values: responses });
      navigate('/');
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!form) return <div>No form found.</div>;

  return (
    <div className="view-form-container">
      <h1>{form.title}</h1>
      <form>
        {form.fields.map((field) => (
          <div key={field._id} className="form-field">
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field._id} // Field ID as the name to map correctly with responses
              placeholder={field.placeholder}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default ViewForm;