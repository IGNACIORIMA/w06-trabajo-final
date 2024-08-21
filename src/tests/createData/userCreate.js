const User = require("../../models/User")

const userCreate = async() => {
    const user = {
        firstName: "Juan",
        lastName: "Yidi",
        email: "juan@gmail.com",
        password: "juan1234",
        phone: "+5763453443"
    }
    await User.create(user)
}


module.exports = userCreate