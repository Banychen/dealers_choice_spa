const Sequelize = require('sequelize');
const client = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const Homework = client.define('homework', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    requirement1:{
        type: Sequelize.TEXT
    },
    requirement2:{
        type: Sequelize.TEXT
    },
     requirement3:{
        type: Sequelize.TEXT
    }
});

const Category = client.define('category',{
    name:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

Homework.belongsTo(Category);
Category.hasMany(Homework);

module.exports = {
    client,
    Homework,
    Category
};