const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const contact = {
        name: req.body.name,
    };

    Contacts.create(contact)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by contactId
exports.findOne = (req, res) => {
    const contactId = req.params.contactId;
    
    Contacts.findByPk(contactId)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Contact not found" });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Delete one contact by contactId
exports.delete = (req, res) => {
    const contactId = req.params.contactId;

    Contacts.destroy({
        where: { contactId: contactId }
    })
    .then(num => {
        if (num === 1) {
            res.send({ message: "Contact deleted successfully." });
        } else {
            res.send({ message: "Cannot delete contact." });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Update a contact by contactId
exports.update = (req, res) => {
    const contactId = req.params.contactId;

    Contacts.update(req.body, {
        where: { contactId: contactId }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update contact with contactId=${contactId}. Maybe contact was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the contact."
        });
    });
};
