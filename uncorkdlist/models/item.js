// Item Model - data model for items added by user

module.exports = function(sequelize, DataTypes){
    var Item = sequelize.define("Item", {
        user_code: { 
            type: DataTypes.STRING,
            unique: 'uniqueSelectedItem'
        },
        data_string:{
            type: DataTypes.STRING,
            unique: 'uniqueSelectedItem'
        } 
    });
      return Item;
    };
