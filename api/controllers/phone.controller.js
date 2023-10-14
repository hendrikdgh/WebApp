const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const phone = {
        number: req.body.number,
        type: req.body.type,
        contactId: req.body.contactId
    };

    Phones.create(phone)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error creating phone number."
            });
        });
};

// Get all phones for a specific contact
exports.findAll = (req, res) => {
    const contactId = req.query.contactId;
    
    Phones.findAll({ where: { contactId: contactId } })
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error fetching phone numbers."
            });
        });
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Phones.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num === 1) {
            res.send({ message: "Phone number deleted successfully." });
        } else {
            res.send({ message: "Cannot delete phone number." });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error deleting phone number."
        });
    });
};
