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

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Contacts.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Some error occurred" });
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
            message: err.message || "Some error occurred"
        });
    });
};

// Update a contact by id
exports.update = (req, res) => {
    const id = req.params.id;

    Contacts.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update contact with id=${id}. Maybe contact was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the contact."
        });
    });
};