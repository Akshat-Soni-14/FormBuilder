const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fields: [
    {
      label: { type: String, required: true },
      type: { type: String, required: true },
      placeholder: { type: String },
      required: { type: Boolean, default: false }
    }
  ],
  responses: [
    {
      submittedAt: { type: Date, default: Date.now }, // Track when the response was submitted
      values: [
        {
          fieldId: { type: mongoose.Schema.Types.ObjectId, ref: 'Field' }, // Reference to the field
          fieldName: { type: String }, // Store the field label
          fieldType: { type: String }, // Store the field type
          value: { type: String } // Store the actual response
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Form', formSchema);
