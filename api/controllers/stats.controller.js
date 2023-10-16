const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = (req, res) => {
    Promise.all([
        Contacts.count(),
        Phones.count(),
        Phones.min('createdAt'),
        Phones.max('createdAt')
    ])
    .then(([numContacts, numPhones, earliestPhone, latestPhone]) => {
        res.send({
            numContacts,
            numPhones,
            earliestPhone,
            latestPhone
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};