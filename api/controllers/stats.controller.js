const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = (req, res) => {
    Promise.all([
        Contacts.count(),
        Phones.count(),
        Contacts.min('createdAt'),
        Contacts.max('createdAt')
    ])
    .then(([numContacts, numPhones, oldestContact, newestContact]) => {
        res.send({
            numContacts,
            numPhones,
            oldestContact,
            newestContact
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while calculating stats."
        });
    });
};
