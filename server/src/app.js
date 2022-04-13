const path = require('path');
const api = require('./api.js');
const DataStore = require('nedb')
const cors = require('cors')

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");
const db = {};
db.users = new DataStore({filename : "./userData.json"});
db.messages = new DataStore({filename : "./messageData.json"});
db.friends = new DataStore({filename : "./friendData.json"});

db.users.loadDatabase();
db.messages.loadDatabase();
db.friends.loadDatabase();

//app.use(cors());


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'   // IP sur laquelle tourne votre client
 }));

app.use(session({
    secret: "technoweb rocks"
}));

app.use('/api', api.default(db));
app.use('/apimessages', api.default(db));
app.use('/apifriends', api.default(db));

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

