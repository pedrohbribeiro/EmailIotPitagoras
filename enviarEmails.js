var emails = require("./emails");
var nodeoutlook = require('nodejs-nodemailer-outlook')

module.exports = async function enviarEmail(temperaturaEmail){
    let emailsEnvio = await emails.getAllSubscribers();
    let texto = `<h1>Temperatura máxima ultrapassada!</h1>
    <br/>
    <br/>
    <p>A temperatura máxima esperada foi ultrapassada</p>
    <p><strong>Temperatura atingida:</strong> ${temperaturaEmail} ºC</p>`
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        from: process.env.EMAIL,
        to: emailsEnvio,
        subject: 'Temperatura crítica atingida!',
        html: texto,
        text: '',
        onError: (e) => console.log('Erro: ' + e),
        onSuccess: (i) => console.log('Sucesso: ' + i)
    });
}
