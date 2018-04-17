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
        },
        category:{
            type: DataTypes.STRING,
            unique: 'uniqueSelectedItem'
        },
        completed:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_date:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }
    });
      return Item;
    };
