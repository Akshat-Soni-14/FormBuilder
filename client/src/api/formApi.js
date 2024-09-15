// src/api/formApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getForms = async () => {
  const response = await axios.get(`${API_BASE_URL}/forms`);
  return response.data;
};

export const createForm = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/form`, formData, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};

export const getFormById = async (formId) => {
  const response = await axios.get(`${API_BASE_URL}/form/${formId}`);
  return response.data;
};

export const submitResponse = async (formId, responseData) => {
  const response = await axios.post(`${API_BASE_URL}/form/${formId}/response`, responseData, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};

export const getFormResponses = async (formId) => {
  const response = await axios.get(`${API_BASE_URL}/form/${formId}/responses`);
  return response.data;
};
