const express = require('express')
const app = express()
// const cors = require('cors');
const admin = require("firebase-admin");

// Initialisation de firestore
var serviceAccount = require("./firestore/culture-jam-firebase-adminsdk-pnm10-20a1036014.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://culture-jam.firebaseio.com"
});
const db = admin.firestore();

// var corsOptions = {
//     origin: 'https://mcynov.gitlab.io/culture-jam/',
//     optionsSuccessStatus: 200
// }

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET');
        res.send();
    });
});

// Route de l'API
app.get('/', function (req, res) {
    res.send('Culture Jam API (v1.0.0) <br> /ping <br> /article/:article <br> /color/:color')
})

app.get('/ping', function (req, res) {
    res.send('pong')
})

app.get('/article/:country', function (req, res) {
    try {
        db.collection('articles').doc(req.params.country).get()
            .then((snapshot) => {
                if(snapshot.data() === undefined){
                    res.send("0");
                }else{
                    res.send(snapshot.data());
                }
            })
            .catch((err) => {
                console.log('Error getting documents', err);
                res.send("Not found data ! \n Error : " + err);
            });
    } catch (error) {
        res.send("Error : " + error)
    }  
})

app.get('/color/:color', function (req, res) {
    try {
        db.collection('colors').doc(req.params.color).get()
            .then((snapshot) => {
                if(snapshot.data() === undefined){
                    res.send("0")
                }else{
                    res.send(snapshot.data());
                }
            })
            .catch((err) => {
                console.log('Error getting documents', err);
                res.send("Not found data ! \n Error : " + err);
            });
    } catch (error) {
        res.send("Error : " + error)
    }
})

// app.use(cors({ origin: true, credentials:true }));
app.listen((process.env.PORT || 3000), function () {
    console.log('CULTURE JAM API (v1.0.0)')
    console.log('Server <START>')
    console.log('Port : 3000')
    console.log('\n')
})
