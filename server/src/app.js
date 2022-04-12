const path = require('path');
const api = require('./api.js');
const DataStore = require('nedb')

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
api_1 = require("./api.js");
const session = require("express-session");
const db = {};
db.users = new DataStore({filename : "./storeData.db"});

db.users.loadDatabase();


app.use(session({
    secret: "technoweb rocks"
}));

app.use('/api', api.default(db));

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

