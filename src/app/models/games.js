module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define('Games', {
      title: {
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
  
    return Games;
}