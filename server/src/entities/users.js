const e = require("express");
const { resolve } = require("path/posix");
const defaultimage = "http://localhost:4000/public/images/";

class Users {
  constructor(db) {
    this.db = db

    // suite plus tard avec la BD
    this.get = this.get.bind(this);
  }

  create(login, password, lastname, firstname) {
    return new Promise((resolve, reject) => {



      this.db.users.insert({ login: login, password: password, lastname: lastname, firstname: firstname, following: [], followers: [],profilePhoto :  defaultimage+"defaultAvatar.jpg" }, function (err, docs) {
        let userid = docs._id
        if (!userid) {
          //erreur
          reject();
        } else {
          console.log(defaultimage+"defaultAvatar.jpg");
          resolve(userid);
        }
      })
    });
  }
  //get
  async get(username) {
    return new Promise((resolve, reject) => {
      // const user = {
      //    login: "pikachu",
      //    password: "1234",
      //    lastname: "chu",
      //    firstname: "pika"
      // }; // À remplacer par une requête bd

      this.db.users.find({ login: username }, function (err, docs) {
        let res_user = docs
        if (!res_user) {
          reject()
        }
        else {
          resolve(res_user)
        }
      });


    });
  }



  async exists(login) {
    return new Promise((resolve, reject) => {
      this.db.users.find({ login: login }, function (err, docs) {
        if (!docs) {
          reject();
        } else {
          if (docs.length == 0) {
            resolve(false);
          }
          else {
            resolve(true);
          }
        }
      })

    });

  }

  async findUser(content) {
    return new Promise((resolve, reject) => {
        //console.log(content)
        this.db.users.find({ login: new RegExp(content) }, function (err, docs) {
            console.log(docs)
            if (!docs) {
                reject();
            } else {
                resolve(docs);
            }
        })
    })
}

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      this.db.users.find({ login: login, password: password }, function (err, docs) {
        if (!docs[0]) {
          //console.log("Username or password error");
          reject("Username or password error")
        } else {
          let username = docs[0].login;
          if (err) {
            reject();
          }
          else {
            resolve(username);
          }
        }

      })

    });
  }

  follow(mylogin, followinglogin) {
    return new Promise((resolve, reject) => {
      this.db.users.update({ login: mylogin }, { $push: { following: followinglogin } }, function (err, docs) {
        if (err) {
          reject();
        }
      })
      this.db.users.update({ login: followinglogin }, { $push: { followers: mylogin } }, function (err, docs) {
        if (err) {
          reject();
        }
      })
      resolve();
    });

  }

  unfollow(mylogin, unfollowlogin){
    return new Promise ((resolve , reject) =>{
      console.log(unfollowlogin)
      this.db.users.update({ login: mylogin }, { $pull: { following: unfollowlogin } }, function (err, docs) {
        if (err) {
          console.log(err);
          reject();
        }
      })
      console.log("2");
      this.db.users.update({ login: unfollowlogin }, { $pull: { followers: mylogin } }, function (err, docs) {
        if (err) {
          console.log(err);
          reject();
        }
      })
      resolve();
    });
  }

  updateProfileImage(username,filename){
    return new Promise((resolve, reject) => {

      this.db.users.update({ login: username }, {$set : {profilePhoto : defaultimage+filename}}, function (err, docs){
        resolve()
      });
    })
  }


  

}

exports.default = Users;

