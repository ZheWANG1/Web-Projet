const express = require("express");
const Users = require("./entities/users.js");
const Message = require("./entities/messages.js");

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

    const messages = new Message.default(db);
    const users = new Users.default(db);
    // createMessage
    router.post("/message", (req, res) => {
        const { login } = req.params.login;
        const { message } = req.body;
        if (!user_id || !message) {
            res.status(400).send("Missing fields");
        } else if (!req.session.userid) {
            res.status(401).send("Vous n'êtes pas autorisé à poster un message");
        } else if (! await users.exists(login)) {
            res.status(401).send("Utilisateur inconnu");
        } else {
            messages.create(message, req.session.username)
                .then((message_id) => res.status(201).send({ id: message_id }))
                .catch((err) => res.status(500).send(err));
        }
    });




    // router.post("/user/:user_id(\\d+)/message", (req, res) => {
    //     const { user_id } = req.params.user_id;
    //     const { message } = req.body;
    //     if (!message) {
    //         res.status(400).send("Missing fields");
    //     } else {
    //         users.addMessage(user_id, message)
    //             .then(() => res.sendStatus(201))
    //             .catch((err) => res.status(500).send(err));
    //     }
    // });

    // router.post("user/user_id/message", async (req, res) => {
    //     let tab = []
    //     const user = await users.get(req.params.user_id);
    //     var message = req.body;
    //     tab.push(message)
    //     res.send(message)


    // });
}
