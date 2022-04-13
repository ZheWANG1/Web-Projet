class Message{
    constructer(db){
        this.db = db;
    }

    async createMessage(message, username){
        return new Promise((resolve, reject) => {
            this.db.messages.insert({ message: message, login: login }, function (err, docs) {
                let messageid = docs._id
                if (!messageid) {
                    //erreur
                    reject();
                } else {
                    resolve(messageid);
                }
            })
        });
    }

    async delete(messageid){
        return new Promise((resolve, reject) => {
            this.db.messages.remove({ _id: messageid }, function (err, docs) {
                if (err) {
                    reject();
                }
                else {
                    resolve(docs);
                }
            })
        });
    }
    
}