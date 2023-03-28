const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
//request body parser
app.use(express.urlencoded({ extended: true }))

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })



//取得資料庫連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () =>{
  console.log('mongodb connected')
})

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