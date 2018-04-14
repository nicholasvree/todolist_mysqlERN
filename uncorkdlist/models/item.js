// Item Model - data model for items added by user

module.exports = function(sequelize, DataTypes){
    var Item = sequelize.define("Item", {
        user_name: { 
            type: DataTypes.STRING,
        },
        item_info:{
            type: DataTypes.STRING,
        },
      });
      return Item;
    };