const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const database = ('bloodData')

async function dbconnection() {
    let connect = await client.connect();
     
    let db = connect.db(database)
    let collection = db.collection('bloodcollections')

    return collection
}
module.exports = dbconnection;
