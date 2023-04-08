const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  const userId = req.user._id
  Todo.find({userId}) //取出Todo model所有資料
    .lean() //把mongoose的model物件轉換為乾淨的JS資料陣列
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))  //將資料傳給前端樣板
    .catch(error => console.log(error)) //錯誤處理
})

//匯出路由模組
module.exports = router