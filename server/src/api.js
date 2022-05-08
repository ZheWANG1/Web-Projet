const { query } = require("express");
const express = require("express");
const Users = require("./entities/users.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const users = new Users.default(db);

    // createUser
    router.post("/user", async (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            let check = await users.exists(login)
            console.log("check : ", check)
            if (check) {
                res.status(401).json({
                    status: 401,
                    message: "login existant, veuillez changer de login"
                });
            } else {
                users.create(login, password, lastname, firstname)
                    .then((user_id) => res.status(201).send({ id: user_id }))
                    .catch((err) => res.status(500).send(err));
            }
        }

    });

    //login 
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            if (! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let username = await users.checkpassword(login, password)

            //console.log("username",username)
            if (username) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.username = username;
                        console.log("req.session : ", req.session.username)
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté",
                            test: req.session.username
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            console.log(e)

            res.status(500).json({
                status: 500,
                message: e,
                details: (e || "Erreur inconnue").toString()
            });
        }
    });
    //getSelf
    router
        .route("/user/self")
        .get(async (req, res) => {
            try {

                const user = await users.get(req.session.username);
                await console.log("req. session", req.session.username)
                if (!user)
                    res.sendStatus(404);
                else
                    res.send(user);
            }
            catch (e) {
                console.log(e);
                res.status(500).send(e)

            }

        })

    //findUser
    router.get("/findUser", async (req, res) => {
        console.log(req.query)
        let { content } = req.query
        console.log(req.body)
        console.log(content);
        try {
            res.status(200).send(await users.findUser(content))
        } catch (e) {
            console.log(e)
            res.status(500).send({ status: 500, message: "internal server error" });
        }

    })

    //getUser
    router
        .route("/user/getUser")
        .get(async (req, res) => {
            try {
                console.log("params", req.params);
                console.log("query", req.query);
                console.log("body", req.body)
                //const user = await users.get(req.params.login)
                const user = await users.get(req.query.login);
                console.log("user :", user);
                if (!user)
                    res.sendStatus(404);
                else
                    res.send(user);
            }
            catch (e) {
                res.status(500).send(e);
            }
        })




    //logout
    router
        .route("/user/logout")
        .delete((req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    console.log("regarde : ", err);
                    res.status(500).json({

                        status: 500,
                        message: "Erreur interne"
                    });
                }
                else {
                    console.log("success");
                    res.status(200).json({
                        status: 200,
                        message: "Logout réussi"
                    });
                }
            });
        });

    //follow
    router.post("/user/follow", async (req, res) => {
        try {
            const { mylogin, followinglogin } = req.body;
            await users.follow(mylogin, followinglogin);
            res.status(200).send({ status: 200, message: "follow success" })
        } catch (e) {
            res.send(500).json({ message: "internal server error , unknown" })
        }
    })

    //follow 
    router.post("/user/self/follow", async (req, res) => {
        try {
            console.log("username : ", req.session.username);
            console.log("body : ", req.body);
            if (!req.session) {
                res.status(501).send("login problem");
            }
            const { Flogin } = req.body;
            if (!Flogin) {
                res.status(502).send("missing body");
            } else {
                const tmp = await users.get(req.session.username)
                console.log(Flogin)
                await users.follow(req.session.username, Flogin);
                res.status(200).send("followed");
            }


        } catch (e) {
            console.log(e)
            res.status(500).send("internal server error , unknown")
        }
    })


    //unfollow 
    router.post("/user/self/unfollow", async (req, res) => {
        try {
            console.log("username : ", req.session.username);
            console.log("body : ", req.body);
            if (!req.session) {
                res.status(501).send("login problem");
            }
            const { Flogin } = req.body;
            if (!Flogin) {
                res.status(502).send("missing body");
            } else {
                if (!req.session) {
                    res.status(503).send("your are not connected")
                } else {
                    const tmp = await users.get(req.session.username)
                    console.log(Flogin)
                    await users.unfollow(req.session.username, Flogin);
                    res.status(200).send("unfollowed");
                }

            }


        } catch (e) {
            console.log(e)
            res.status(500).send("internal server error , unknown")
        }
    })

    router.post("/user/self/updateProfileImage", async (req, res) => {
        try {
            console.log("body : ", req.body)
            users.updateProfileImage(req.session.username, req.body.filename)
            res.sendStatus(200);

        } catch (e) {
            res.status(500).send("internal server error , unknown")
        }
    })

    return router;
}
exports.default = init;

