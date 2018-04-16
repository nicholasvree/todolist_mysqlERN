// Item Model - data model for items added by user

module.exports = function(sequelize, DataTypes){
    var Item = sequelize.define("Item", {
        user_code: { 
            type: DataTypes.STRING,
        },
        data_string:{
            type: DataTypes.STRING,
        },
      });
      return Item;
    };