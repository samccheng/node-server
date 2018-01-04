const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
// app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now} ${req.method} ${req.url}`

  console.log(log)

  fs.appendFile('server.log', log + '\n', err => {
    if(err) {
      console.log(err)
    }
  })

  next()
})

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('uppercase', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'home',
    message: 'welcome to my website'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'about page'
  })
})


app.listen(PORT, () => console.log(`server running on port ${PORT}`))
