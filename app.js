const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

//request body parser
app.use(express.urlencoded({ extended: true }))
//定義要使用的樣版引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
//告訴express要使用的view engine 是 handlebar
app.set('view engine', 'hbs')

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
//載入Todo model
const Todo = require('./models/todo')

//設定靜態檔案路由，讓伺服器知道靜態檔案要去哪邊查找
app.use(express.static('public'))

app.get('/', (req, res) => {
  Todo.find() //取出Todo model所有資料
    .lean() //把mongoose的model物件轉換為乾淨的JS資料陣列
    .then(todos => res.render('index', { todos }))  //將資料傳給前端樣板
    .catch(error => console.log(error)) //錯誤處理
})

app.listen(port, () => {
  console.log(`Server is listening on http://locallhost:${port}`)
})