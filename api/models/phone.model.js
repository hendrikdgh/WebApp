module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    phoneId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: { 
      type: Sequelize.STRING,
      allowNull: false
    },
    phone_number: { 
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
    }
    contactId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'contacts',
        key: 'contactId'
      }
    }
  });
  
    return Phone;
  };
  