const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt')

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

User.beforeCreate(async(user)=> {
    const password = user.password
    const hashedpassword = await bcrypt.hash(password, 10)
    user.password = hashedpassword 
})

/* const res = await request(App)
    .get(BASE_URL)
    .set('authorization',`Bearer ${token}`)
    console.log('res del test',res)
    expect(res.statusCode).toBe(200) */

module.exports = User;