const express = require('express')
const app = express()
// const db = require('./firestore/firestore')

const admin = require("firebase-admin");

var serviceAccount = require("./firestore/culture-jam-firebase-adminsdk-pnm10-20a1036014.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://culture-jam.firebaseio.com"
});

const db = admin.firestore();


app.get('/', function (req, res) {
    res.send('Culture Jam API (v1.0.0)')
})

app.get('/ping', function (req, res) {
    res.send('pong')
})

app.get('/test', function (req, res){
    db.collection('articles').doc('FR').get()
        .then((snapshot) => {
            console.log(snapshot.data());
            res.send(snapshot.data());
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.send("Not found data !")
        });
})

app.get('/article/:country', function (req, res) {
    console.log(req.params)
    // res.send('test data')
    try {
        firestore.db.collection('articles').doc(req.params.country).get()
            .then((snapshot) => {
                console.log(snapshot);
                res.send(snapshot);
            })
            .catch((err) => {
                console.log('Error getting documents', err);
                res.send("Not found data !")
            });
    } catch (error) {
        res.send("Error : " + error)
    }
    
})

app.get('/colors/:color', function (req, res) {
    console.log(req.params)
    console.log(req.body)
    console.log(req.query)
    res.send('test data')
    // try {
    //     firestore.db.collection('articles').doc(country).get()
    //         .then((snapshot) => {
    //             console.log(snapshot);
    //             res.send(snapshot);
    //         })
    //         .catch((err) => {
    //             console.log('Error getting documents', err);
    //         });
    // } catch (error) {
    //     res.send("Error : " + error)
    // }

})

app.listen(3000, function () {
    console.log('CULTURE JAM (v1.0.0)')
    console.log('Server <START>')
    console.log('Port : 3000')
    console.log('\n')
})
