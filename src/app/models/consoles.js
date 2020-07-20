module.exports = (sequelize, DataTypes) => {
    const Consoles = sequelize.define('Consoles', {
      description: {
          type: DataTypes.STRING,
          validate: {
            len: [2, 200]
          }
      },
      createdAt: {
          type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    });
  
    return Consoles;
  }