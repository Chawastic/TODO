class StatusService {
    constructor(db) {
        this.db = db;
    }

    async getAllStatuses() {
        return await this.db.Status.findAll();
    }
}

module.exports = StatusService;