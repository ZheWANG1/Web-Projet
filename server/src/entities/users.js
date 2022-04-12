class Users {
  constructor(db) {
    this.db = db

    // suite plus tard avec la BD
  }

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {
      this.db.users.insert({ login: login, password: password, lastname: lastname, firstname: firstname }, function (err, docs) {
        let userid = docs._id
        if (!userid) {
          //erreur
          reject();
        } else {
          resolve(userid);
        }
      })
    });
  }

  get(userid) {
    return new Promise((resolve, reject) => {
      // const user = {
      //    login: "pikachu",
      //    password: "1234",
      //    lastname: "chu",
      //    firstname: "pika"
      // }; // À remplacer par une requête bd

      const user = db.users.find({ id: userid });

      if (!user) {
        //erreur
        reject();
      } else {
        // if(userid == 1) {
        //   resolve(user);
        // } else {
        //   resolve(null);
        // }
        resolve(user)
      }
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      if (false) {
        //erreur
        reject();
      } else {
        resolve(true);
      }
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      let userid = db.users.find({ login: login, password: password }, { _id: 1 }); // À remplacer par une requête bd
      if (false) {
        //erreur
        reject();
      } else {
        resolve(userid);
      }
    });
  }

}

exports.default = Users;

