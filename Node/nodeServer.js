const generateChartPage = require('./grafico/grafico.js');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');

let players = []; 
let userSearch = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); 

const transporter = nodemailer.createTransport({
    //preencher o user e o pass com o email e a senha de alguma hotmail para funcionar
    service: 'hotmail',
    auth: {
        user: 'webScrapingTeste@hotmail.com', 
        pass: 'ScrapingDeDados'
    }
});

app.post('/upload', (req, res) => {
    players = req.body;
    players.sort((a, b) => a.overall - b.overall);
});

app.post('/notify', (req, res) => {
    team = req.body.team;
    userMail = req.body.email;
    userSearch = players.filter(player => player.clube === team);
    sendUserSearchEmail(userSearch, userMail,team);
    res.redirect('/chart');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

function sendUserSearchEmail(userSearch, userMail,team) {
    const mailOptions = {
        from: 'webScrapingTeste@hotmail.com', 
        to: userMail, 
        subject: 'Resultados da Pesquisa de Jogadores',
        text: `Resultados da pesquisa para o time ${team}:\n\n` + 
              userSearch.map(player => 
                `Nome: ${player.nome} \n Clube: ${player.clube} \n Posição: ${player.posicao} \n Idade: ${player.idade} \n Overall: ${player.overall} \n \n`
              ).join('\n')
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
        } else {
            console.log('Email enviado com sucesso');
        }
    });
}



app.get('/chart', (req, res) => {
  const pageSize = 20; 
  const pageIndex = parseInt(req.query.page) || 1;
  const totalPages = Math.ceil(players.length / pageSize);

  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;
  const playersPage = players.slice(start, end);

  const html = generateChartPage(playersPage, pageIndex - 1, totalPages);
  res.send(html);
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
