module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: { 
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_number: { 
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return Contact;
  };
  