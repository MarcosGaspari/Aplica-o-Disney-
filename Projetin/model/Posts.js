const MongoClient = require('mongodb').MongoClient;

module.exports = class Posts{
    static async find(busca, senha){
        const conn = await MongoClient.connect('mongodb://localhost:27017/Projeto');
        const db = conn.db();
        if (busca && senha){
            return await db.collection('usuarioSenha').find({Usuario:(busca), senha: (senha) }).toArray();
        }
    }
}   
//module.exports = class Cadastro{
//    static async insert(adicionar,password){
  //      conn = await MongoClient.connect('mongodb://localhost:27017/Projeto');
    //        db.conn.db();
      //  db.collection('usuarioSenha').insertOne({Usuario: adicionar , senha: password});
    //}
//}