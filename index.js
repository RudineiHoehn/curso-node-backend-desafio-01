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

const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('main')
})

app.post('/check', (req, res) => {
  const { age } = req.body
  if (age < 18) {
    res.redirect(`minor/?age=${age}`)
  } else {
    res.redirect(`major/?age=${age}`)
  }
})

app.get('/major', checkAgeQueryParam, (req, res) => {
  const { age } = req.query

  res.render('major', { age })
})

app.get('/minor', checkAgeQueryParam, (req, res) => {
  const { age } = req.query
  res.render('minor', { age })
})

app.listen(3000)
