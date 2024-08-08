const OfficeInfo = require('../models/OfficeInfo');

exports.getOfficeInfo = async (req, res) => {
  try {
    const info = await OfficeInfo.findOne(); // Assuming there's only one document
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve office information' });
  }
};

exports.updateOfficeInfo = async (req, res) => {
  const { officeName, address, phone, email, services, description } = req.body;
  try {
    let info = await OfficeInfo.findOne();
    if (!info) {
      info = new OfficeInfo(req.body);
    } else {
      info.officeName = officeName;
      info.address = address;
      info.phone = phone;
      info.email = email;
      info.services = services;
      info.description = description;
    }
    await info.save();
    res.json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update office information' });
  }
};
