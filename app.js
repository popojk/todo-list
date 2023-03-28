const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
//request body parser
app.use(express.urlencoded({ extended: true }))

const port = 3000

//定義要使用的樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

//告訴express要使用的view engine 是 handlebar
app.set('view engine', 'handlebars')

//設定靜態檔案路由，讓伺服器知道靜態檔案要去哪邊查找
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('todo list')
})

app.listen(port, () => {
  console.log(`Server is listening on http://locallhost:${port}`)
})