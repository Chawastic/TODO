class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async getOne(email) {
        return this.User.findOne({
            where: {Email: email}
        })
    }

    async create(name, email, encryptedPassword, salt) {
        return this.User.create({
            name,
            email,
            encryptedPassword,
            salt
        })
    }
}

module.exports = UserService;