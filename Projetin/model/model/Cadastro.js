const MongoClient = require('mongodb').MongoClient;

module.exports = class Cadastro{
    static async find(busca){
        const conn = await MongoClient.connect('mongodb://localhost:27017/Projeto');
        const db = conn.db();
        if (busca){
            return await db.collection('usuarioSenha').find({Usuario: new RegExp('^' + busca)}).toArray();
            return await db.collection('usuarioSenha').find().toArray();
        }
        
    }
}