const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { allContacts },
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    const error = new Error("Not found contact");
    error.status = 404;
    throw error;
  }
  return res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};
const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    const error = new Error("Not found contact");
    error.status = 404;
    throw error;
  }
  res.json({ message: "contact deleted" });
};

const addContact = async (req, res, next) => {
  const body = req.body;
  const newContact = await contacts.addContact(body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updatedContact = await contacts.updateContact(contactId, body);
  if (!updatedContact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};

module.exports = {
  updateById,
  addContact,
  deleteById,
  getById,
  getAll,
};
