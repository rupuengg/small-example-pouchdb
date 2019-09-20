const PouchDB = require('pouchdb');

const localDB = new PouchDB('testdb');
const remoteDB = new PouchDB('http://localhost:5984/testdb');

localDB.info().then(res => {
  console.log('Created');
});

var doc = {
  "_id": "mittens3",
  "name": "Mittens",
  "occupation": "kitten",
  "age": 3,
  "hobbies": [
    "playing with balls of yarn",
    "chasing laser pointers",
    "lookin' hella cute"
  ]
};

localDB.put(doc);

localDB.get('mittens').then(doc => {
  console.log(doc);
}).catch(err => {
  console.log(err);
});

localDB.sync(remoteDB).on('complete', function () {
  // yay, we're in sync!
}).on('error', function (err) {
  // boo, we hit an error!
});