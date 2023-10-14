module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
      id: {
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
    });
  
    return Phone;
  };
  