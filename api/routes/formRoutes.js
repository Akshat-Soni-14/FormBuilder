const express = require('express');
const {
  createForm,
  getForms,
  getFormById,
  submitResponse,
  getResponses
} = require('../controllers/formController');

const router = express.Router();

router.post('/form', createForm);
router.get('/forms', getForms);
router.get('/form/:id', getFormById);
router.post('/form/:id/response', submitResponse);
router.get('/form/:id/responses', getResponses);

module.exports = router;
