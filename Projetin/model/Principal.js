
let xhr = new XMLHttpRequest();
let Personagem = document.querySelector('.Personagem');
const timeStamp = '1618243974';
const apiKey = 'cd50d89c84a9a1f4b7f6c6bf6ec03977';
const md5 = '226b4e02b51dbb95afdcd22f3df94612';

document.getElementById('Entrar').addEventListener('click', function(){
    debugger;
    document.getElementById("Login").style.visibility = 'visible';
    document.getElementById('botão').addEventListener('click', function(){
        document.getElementById("erro1").style.display = 'none';
        document.getElementById("erro2").style.display = 'none';
        if (Email.validity.valid == true){
            if(Senha.validity.valid == true){
               ReqresLogin();
               ApiMarvel();
            }else{
                document.getElementById("erro2").style.display = 'block';
                document.getElementById('senha').focus();
            }
        }else{
            document.getElementById("erro1").style.display = 'block';
            document.getElementById('start').focus();
        }
    });
    document.getElementById('X').addEventListener('click', function(){
        document.getElementById("Login").style.visibility = 'hidden';
    });
});    
function ReqresLogin(){
    xhr.open('POST', 'https://reqres.in/api/login',true);
    debugger;
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200){
                        window.localStorage.setItem("token",Senha);
                        document.getElementById("Login").style.visibility = 'hidden';
                    }
                    if(xhr.status == 400){
                        document.getElementById("erro1").style.display = 'block';
                        document.getElementById('start').focus();
                    }
                }
            }
                xhr.send(JSON.stringify({
                    email: Email.value,
                    password: Senha.value
                }));
}

function ApiMarvel(){
    document.getElementById("Marvel").style.display = 'block';
    input = document.getElementById("texto");
    fetch (`https://gateway.marvel.com:443/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=100`
    ).then((resposta) =>{
        return resposta.json();
    }).then((jsonParsed)=>{
        elementos = jsonParsed.data.count; 

        document.getElementById('texto').addEventListener('click', function(){
            Personagem.innerHTML = ''; 
            document.getElementById("erro").style.display = 'none';

            let contador = 0;
            if (input.value != ''){
                for(i=0; i<elementos;i++){
                    const nomeHeroi =  jsonParsed.data.results[i].name
                    if(nomeHeroi.includes(input.value)){
                        contador = 1;
                        const img = document.createElement('img');
                        const li = document.createElement('li');
                        img.src = jsonParsed.data.results[i].thumbnail.path+'.'+jsonParsed.data.results[i].thumbnail.extension
                        li.innerHTML = nomeHeroi;
                        li.appendChild(img); 
                        Personagem.appendChild(li);   
                    }
                }
            }
            if (contador == 0){
                document.getElementById("erro").style.display = 'block';
            }
        });
    });
}
