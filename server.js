var express = require('express');
var bodyParser = require('body-parser');
var app = new express();
app.use(bodyParser.urlencoded({
	extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
/*------------------连接数据库配置数据库------------------*/
app.listen('3001', function() {
	console.log('成功启动');
});

app.get('/test', function(req, res) {
	const fs = require('fs');
	fs.readFile('./src/ItemDetail/img/test.png', function(err, data) {
		if(err) 
			console.log(err)
		res.send(data);
		return ;
	})
})

app.post('/home', function(req, res) {
	res.send({
		status: '0',
		data: [{
			intimacy: "10",
			detail: "东西不错",
			price: "20",
			nickname: "allen",
			userId: "string",
			itemId: "string",
			userImg: "avatar.png",
			images: ["home1.png", "home2.png", "home3.png"],
			tags: ["彩妆", "运动", "健身", "跑步"],
			online: "boolean"
		}, {
			intimacy: "20",
			detail: "东西很好",
			price: "30",
			nickname: "pony",
			userId: "string",
			itemId: "string",
			userImg: "avatar.png",
			images: ["home1.png", "home3.png"],
			tags: ["彩妆", "运动", "健身", "跑步"],
			online: "boolean"
		}, {
			intimacy: "20",
			detail: "东西很好",
			price: "30",
			nickname: "pony",
			userId: "string",
			itemId: "string",
			userImg: "avatar.png",
			images: ["home1.png", "home3.png"],
			tags: ["彩妆", "运动", "健身", "跑步"],
			online: "boolean"
		}, {
			intimacy: "20",
			detail: "东西很好",
			price: "30",
			nickname: "pony",
			userId: "string",
			itemId: "string",
			userImg: "avatar.png",
			images: ["home1.png", "home3.png"],
			tags: ["彩妆", "运动", "健身", "跑步"],
			online: "boolean"
		}]
	})
});
app.post('/itemMsg',function(req,res){
	res.send({
		status:'0',
		data:{ 
        msgList :[ 
	        {
	            "msgId" : "111111",
	            "fromUserId" : "222222",
	            "fromUserAvatar" : "F:/youshi_frontend/src/myPage/img/我的头像.png",
	            "value" : "包邮吗",
	            "time" : "2017-09-12",
	            "itemId" : "3333333"
	        },
	        {
	        	"msgId" : "444444",
	            "fromUserId" : "555555",
	            "fromUserAvatar" : "F:/youshi_frontend/src/myPage/img/我的头像.png",
	            "value" : "便宜一点嘛",
	            "time" : "2017-06-08",
	            "itemId" : "6666666"
	        }
        ]
      }
	})
})
app.post('/qqInfo',function(req,res){
	res.send({
		status:'0',
		data:{
			'constellation':'狮子座',
			'nativePlace':'广东-深圳',
			'age':'23',
			'gender':'女',
			'qqNum':'88888888',
			'img':'',
			'points':'9'
		}
	})
})

app.post('/homeTag', function(req, res) {
	res.send({
		status: '0',
		data: [{
			intimacy: "12220",
			detail: "东西不222错",
			price: "20",
			nickname: "all222en",
			userId: "strin22g",
			itemId: "string",
			userImg: "avatar.png",
			images: ["home1.png", "home2.png", "home3.png"],
			tags: ["彩妆", "运动", "健身", "跑步"],
			online: "boolean"
		}, {
			intimacy: "20",
			detail: "东西很好",
			price: "30",
			nickname: "pony",
			userId: "string",
			itemId: "string",
			userImg: "avatar.png",
			images: ["home1.png", "home3.png"],
			tags: ["彩妆", "运动", "健身", "跑步"],
			online: "boolean"
		}, {
			intimacy: "20",
			detail: "东西很好",
			price: "30",
			nickname: "pony",
			userId: "string",
			itemId: "string",
			userImg: "avatar.png",
			images: ["home1.png", "home3.png"],
			tags: ["彩妆", "运动", "健身", "跑步"],
			online: "boolean"
		}, {
			intimacy: "20",
			detail: "东西很好",
			price: "30",
			nickname: "pony",
			userId: "string",
			itemId: "string",
			userImg: "avatar.png",
			images: ["home1.png", "home3.png"],
			tags: ["彩妆", "运动", "健身", "跑步"],
			online: "boolean"
		}]
	})
});