module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    phoneId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    contactId: {
      type: Sequelize.INTEGER,
      allowNull: false
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
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
  });

  return Phone;
};
