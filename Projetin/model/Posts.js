const MongoClient = require('mongodb').MongoClient;

module.exports = class Posts{
    static async find(){
        const conn = await MongoClient.connect('mongodb://localhost:27017/exemplo01');
        const db = conn.db();
        return await db.collection('posts').find().toArray();
    }
}