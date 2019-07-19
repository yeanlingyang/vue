require('./aa')

// 引入jquery来实现隔行变色
const $ = require('jquery')
const moment = require('moment')

// 导入样式
require('./css/base.css')

// 导入样式
require('./less/index.less')
require('./less/header.less')

// 导入字体图标
require('./fonts/iconfont.css')

$(function() {
  $('li:odd').css('color', 'red')
  $('li:even').css('color', 'green')

  $('li:last').text(moment().format('YYYY-MM-DD'))
})

const fn = () => {
  console.log('哈哈')
}
