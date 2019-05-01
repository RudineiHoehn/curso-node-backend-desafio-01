const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('view', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('main')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age < 18) {
    res.redirect(`minor/?age=${age}`)
  } else if (age >= 18) {
    res.redirect(`major/?age=${age}`)
  } else {
    res.redirect('/')
  }
})

app.get('/major', (req, res) => {
  const age = req.query.age
  res.render('major', { age })
})

app.get('/minor', (req, res) => {
  const age = req.query.age
  res.render('minor', { age })
})

app.listen(3000)
