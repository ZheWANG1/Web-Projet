class Message {
    constructor(db) {
        this.db = db;
    }

    async create(message, login) {
        return new Promise((resolve, reject) => {
            this.db.messages.insert({ message: message, login: login, date: Date.now() }, function (err, docs) {
                let messageid = docs._id
                if (!messageid) {
                    reject();
                } else {
                    resolve(messageid);
                }
            })
        });
    }

    delete(messageid) {
        return new Promise((resolve, reject) => {
            this.db.messages.remove({ _id: messageid }, function (err, numRemoved) {
                if (err) {
                    reject();
                }
                else {
                    resolve(numRemoved);
                }
            })
        });
    }
    async getUserMessage(username) {
        return new Promise((resolve, reject) => {
            this.db.messages.find({ login: username }, function (err, docs) {
                let mess = docs
                if (!mess) {
                    reject();
                } else {
                    resolve(mess);
                }
            })
        })
    }

    async getAllMessage() {
        return new Promise((resolve, reject) => {
            this.db.messages.find({}).sort({ date: -1 }).exec(function (err, docs) {
                let mess = docs
                if (!mess) {
                    reject();
                } else {
                    resolve(mess);
                }
            })
        })

    }



    async findMessage(content) {
        return new Promise((resolve, reject) => {
            this.db.messages.find({ message: /content/ }, function (err, docs) {
                let message = docs
                if (!message) {
                    reject();
                } else {
                    resolve(messsage);
                }
            })
        })
    }




}

exports.default = Message;