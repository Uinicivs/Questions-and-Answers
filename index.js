const express = require('express')
const app = express()
//BODYPARSER - PEGA CAMPOS DO BODY DA REQUEST
const bodyParser = require('body-parser')
//SEQUELIZE - CONEXÃO COM O MYSQL
const connection = require('./database/database')
connection
    .authenticate()
    .then(() => console.log('deu certo'))
    .catch((error) => console.log(error))

const questionModel = require('./database/Asking')
const answerModel = require('./database/Answer')

//SETS
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//ROTAS
app.get('/', (_req, res) => {
    questionModel.findAll({raw: true, order: [['id', 'DESC']]}).then(questions => {
        res.render('index', {
            questions: questions
        })
    })
    
})

app.get('/question', (req, res) => {
    res.render('question')
})

app.post('/savequestion', (req, res) => {
    const title = req.body.title
    const question = req.body.question
    questionModel.create({
        title: title,
        description: question
    })
    .then(() => res.redirect('/'))
})

app.get('/question/:id', (req, res) => {
    const id = req.params.id
    questionModel.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){
            answerModel.findAll({
                where: {questionId: id}
            })
            .then(answers => res.render('idquestion', {
                idquestion: question,
                answers: answers
            }))
            
        }
        else
            res.redirect('index')
    })
})

app.post('/saveanswer', (req, res) => {
    const answer = req.body.answer_text
    const questionID = req.body.question_id
    answerModel.create({
        response: answer,
        questionId: questionID
    }).then(() => res.redirect(`/question/${questionID}`))
})

//APP
app.listen(8080, () => {console.log('ok')})