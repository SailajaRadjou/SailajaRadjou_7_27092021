module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postTextMsg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });

        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        });
    }
    return Posts;
};