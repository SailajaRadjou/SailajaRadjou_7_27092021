module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {        
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },     
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }        
    });
    //creating with associations
    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });
        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
        
    }
    return Users;
};