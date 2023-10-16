module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define("contact", {
    contactId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { 
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
  });
  
    return Contact;
  };
  