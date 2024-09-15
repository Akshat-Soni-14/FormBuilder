// src/components/ResponsePage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormResponses } from '../api/formApi';
import '../styles/ViewResponse.css';

const ViewResponse = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const data = await getFormResponses(id);
        setResponses(data.responses);
      } catch (error) {
        setError('Error fetching responses.');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!responses.length) {
    return <div>No responses available.</div>;
  }

  // Extract the field names from the first response for table headers
  const fieldNames = responses[0].values.map((field) => field.fieldName);

  return (
    <div className="response-page-container">
      <h1>Responses</h1>
      <table className="response-table">
        <thead>
          <tr>
            <th>#</th> {/* Index Column */}
            {fieldNames.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.map((response, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td> {/* Index starting from 1 */}
              {response.values.map((field, colIndex) => (
                <td key={colIndex}>{field.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewResponse;
