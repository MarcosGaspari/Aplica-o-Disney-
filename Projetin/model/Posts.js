const MongoClient = require('mongodb').MongoClient;

module.exports = class Posts{
    static async find(busca, senha){
        const conn = await MongoClient.connect('mongodb://localhost:27017/Projeto');
        const db = conn.db();
        if (busca && senha){
            return await db.collection('usuarioSenha').find({Usuario:(busca), senha: (senha) }).toArray();
        }
    }

  static async gravar(busca, senha){
      const conn = await MongoClient.connect('mongodb://localhost:27017/Projeto');
      const db = conn.db();
       db.collection('usuarioSenha').insertOne({Usuario: (busca), senha: (senha)});
       conn.close();
      }

    static async logar(login,senha){ 
        const conn = await MongoClient.connect('mongodb://localhost:27017/Projeto'); 
        const db = conn.db();
        const myUser =  await db.collection('usuarioSenha').find({Usuario:(login), senha: (senha) }).toArray();
        
        function consulta(user){
              return user.Usuario === login && user.senha === senha;
        }
        
        // if(this.find(login,senha) != null || this.find(login,senha) != 0){
        //   conn.close();
        //   console.log("LOGADO!");
        //   return true;
        // }  
        if(myUser.find(consulta)){
          conn.close();
          console.log("LOGADO!");
          return true;           
        }
        else{
            console.log("NAO EXISTE!");
            conn.close();
            return false;
        }
  }
      
  }