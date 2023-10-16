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
                message: err.message || "Some error occurred"
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
                message: err.message || "Some error occurred"
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
    const phoneId = req.params.phoneId;

    Phones.findByPk(phoneId)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Phone not found with id " + id });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the phone."
            });
        });
};

// Update one phone by id
exports.update = (req, res) => {
    const phoneId = req.params.phoneId;

    Phones.update(req.body, {
        where: { phoneId: phoneId }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Phone updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update phone with id=${id}. Maybe phone was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the phone."
        });
    });
};


// Delete one phone by id
exports.delete = (req, res) => {
    const phoneId = req.params.phoneId;

    Phones.destroy({
        where: { phoneId: phoneId }
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
            message: err.message || "Some error occurred"
        });
    });
};
