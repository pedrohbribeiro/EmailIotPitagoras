var dotenv_flow = require("dotenv-flow");
dotenv_flow.config();
var admin = require("firebase-admin");
var serviceAccount = require('./auth.json');
var enviarEmails = require("./enviarEmails");

// recebimentoiotpitagoras@outlook.com
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://temperature-iot-pitagoras.firebaseio.com"
});

var dataUltimoEnvio;
var intervaloEmailsMs = 10000;

var db = admin.database();
var ref = db.ref("/");
ref.on("value", function(snapshot) {
    let result = snapshot.val();
    let temperaturaAtual = result.temperature_real_time.temperature_value;
    let temperaturaMaxima = result.temperature_alert;
    console.log("A temperatura atual é: " + temperaturaAtual + " ºC");
    if(temperaturaAtual > temperaturaMaxima){
        console.log("A temperatura está " + (temperaturaAtual-temperaturaMaxima) + " ºC acima da temperatura máxima");
    
        if(dataUltimoEnvio == undefined || (new Date() - dataUltimoEnvio) >= intervaloEmailsMs){
            dataUltimoEnvio = new Date();
            enviarEmails(temperaturaAtual);
        }
        else{
            console.log("Faltam " + (intervaloEmailsMs - (new Date() - dataUltimoEnvio)) + " milisegundos");
        }
    }
    else{
        console.log("A temperatura está normal");
    }
}, function (errorObject) {
    console.log("Erro ao realizar leitura: " + errorObject.code);
});