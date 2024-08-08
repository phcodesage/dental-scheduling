const mongoose = require('mongoose');

const OfficeInfoSchema = new mongoose.Schema({
  officeName: String,
  address: String,
  phone: String,
  email: String,
  services: [String],  // List of services offered
  description: String,
});

const OfficeInfo = mongoose.model('OfficeInfo', OfficeInfoSchema);

module.exports = OfficeInfo;
