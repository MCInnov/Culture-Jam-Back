const admin = require("firebase-admin");

var serviceAccount = require("./culture-jam-firebase-adminsdk-pnm10-20a1036014.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://culture-jam.firebaseio.com"
});

module.exports.db = admin.firestore();
