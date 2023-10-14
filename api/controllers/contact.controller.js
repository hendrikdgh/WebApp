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
                message: err.message || "Error creating contact."
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error fetching contacts."
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Contacts.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found" });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error fetching contact."
            });
        });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Contacts.destroy({
        where: { id: id }
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
            message: err.message || "Error deleting contact."
        });
    });
};
