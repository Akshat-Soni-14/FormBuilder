import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateForm from './components/CreateForm';
import ViewForm from './components/ViewForm';
import ResponsesPage from './components/ResponsesPage';
import ViewResponse from './components/ViewResponse';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form/create" element={<CreateForm />} />
        <Route path="/form/:id" element={<ViewForm />} />
        <Route path="/responses" element={<ResponsesPage />} />
        <Route path="/responses/:id" element={<ViewResponse />} />
      </Routes>
    </div>
  );
}

export default App;


