const Form = require('../models/Form');

// Create a new form
exports.createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;
    const newForm = new Form({ title, fields });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while saving the form' });
  }
};

// Get all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving forms' });
  }
};

// Get a specific form
exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving form' });
  }
};

// Submit response to a form
exports.submitResponse = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const responseValues = form.fields.map((field) => {
      return {
        fieldId: field._id, // Store the field ID
        fieldName: field.label, // Store the field name (label)
        fieldType: field.type, // Store the field type
        value: req.body.values[field._id] || '' // The submitted value for this field
      };
    });

    form.responses.push({ values: responseValues });

    await form.save();
    res.status(200).json({ message: 'Response submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get responses of a form
exports.getResponses = async (req, res) => {
  try {
      const { id } = req.params;

      // Validate form ID
      const form = await Form.findById(id);
      if (!form) return res.status(404).json({ message: 'Form not found' });

      // Retrieve and return responses
      res.status(200).json({ responses: form.responses });
  } catch (error) {
      console.error('Error in getResponses:', error);
      res.status(500).json({ message: 'An error occurred while retrieving the responses' });
  }
};
