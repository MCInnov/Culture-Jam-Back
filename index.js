const express = require('express')
const app = express()
const admin = require("firebase-admin");

// Initialisation de firestore
var serviceAccount = require("./firestore/culture-jam-firebase-adminsdk-pnm10-20a1036014.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://culture-jam.firebaseio.com"
});
const db = admin.firestore();

// Route de l'API
app.get('/', function (req, res) {
    res.send('Culture Jam API (v1.0.0) \n /ping \n /article/:article \n /color/:color')
})

app.get('/ping', function (req, res) {
    res.send('pong')
})

// app.get('/test', function (req, res){
//     db.collection('articles').doc('FR').get()
//         .then((snapshot) => {
//             console.log(snapshot.data());
//             res.send(snapshot.data());
//         })
//         .catch((err) => {
//             console.log('Error getting documents', err);
//             res.send("Not found data !")
//         });
// })

app.get('/article/:country', function (req, res) {
    try {
        db.collection('articles').doc(req.params.country).get()
            .then((snapshot) => {
                res.send(snapshot.data());
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
                res.send(snapshot.data());
            })
            .catch((err) => {
                console.log('Error getting documents', err);
                res.send("Not found data ! \n Error : " + err);
            });
    } catch (error) {
        res.send("Error : " + error)
    }
})

app.listen((process.env.PORT || 3000), function () {
    console.log('CULTURE JAM API (v1.0.0)')
    console.log('Server <START>')
    console.log('Port : 3000')
    console.log('\n')
})
