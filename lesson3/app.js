var express=require("express");
var app=express();
var cheerio=require("cheerio");
var superagent=require("superagent");


app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('http://www.qqzhibo.tk/ch/nba/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('#righteventbox li').each(function (idx, element) {
        var $element = $(element);
        items.push({
          time: $element.find(".eventtxt1").html(),
          match: $element.find(".eventtxt4 a").html(),
          href:$element.find(".eventtxt4 a").attr("href")
        });
      });

      res.send(items);
    });
});

app.listen(3000,function(req,res){
  console.log("port 3000 ")
})