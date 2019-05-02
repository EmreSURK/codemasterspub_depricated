



router.get('/ajax/gettitles', function (req, res) {
	var stQuery = "select * from topics";
	connection.query(stQuery, function (err, rows) {
		if (err) console.log(err);
		var tophtml = "";
		for (var i = 0; i < rows.length; i++) {
			var bean = '<a ><p onclick=getTopic(' + rows[i].idtopic + ',this) style="color: #f3f3f3">  > ' + rows[i].title + '</p></a>';
			tophtml += bean;
		}
		res.end(tophtml);
	});
});

router.get('/ajax/getsinglepost', function (req, res) {
	var id = req.query.pid;
	if (!id) {
		res.end("bulamadık.soldan tıklayıp devam edebilirsin.");
		return;
	}
	var squery = "select * from post left join topics on post.posttopicid = topics.idtopic " +
		"left join users on post.postuserid = users.iduser where idpost = ?";
	connection.query(squery, [id], function (err, rows) {
		if (err) console.log(err);
		if (rows.length > 0) {
			rows[0].text = rows[0].text.split('\r\n');
			res.render('singlepost', {post: rows[0]});
		}
		else
			res.end("bulamadık.soldan tıklayıp devam edebilirsin.");
		
	})
	
});

router.get('/topics', function (req, res) {
	var stQuery = "select * from topics";
	connection.query(stQuery, function (err, rows) {
		if (err) console.log(err);
		var tophtml = "";
		for (var i = 0; i < rows.length; i++) {
			var bean = '<p style="color: rgb(81,81,81)">' + rows[i].title + '</p>';
			tophtml += bean;
			// #f3f3f3
		}
		res.end(tophtml);
	});
});

router.get('/test', function (res, res) {
	res.render('test');
});

//id si verilen topic 'in html ini render et
router.get('/ajax/gettopic', function (req, res) {
	var id = req.query.id;
	
	if (id == 'undefined') {
		res.end("yok.bulamadık.soldan kendine yeni konu seçebilirsin");
		return;
	}
	
	var stquery = "select * from post left join users u on u.iduser = post.postuserid where posttopicid = %id%".replace('%id%', id);
	var topQuery = "select * from topics where idtopic = %id%".replace('%id%', id);
	connection.query(topQuery, function (terr, trows) {
		if (terr) console.log(terr);
		connection.query(stquery, function (err, rows) {
			if (err) console.log(err);
			if (!rows) {
				res.end("olmadı.bulamadık.");
				return;
			}
			
			for (var i = 0; i < rows.length; i++) {
				rows[i].createDate = rows[i].createDate.toISOString().split('T')[0].replace('-', '/').replace('-', '/');
				rows[i].text = rows[i].text.split('\n');
			}
			
			//console.log(rows);
			res.render('topic', {title: trows[0].title, topics: rows});
			
			/*
			 var title = trows[0].title;

			 var bodyhtml = '<h3><u id="titlefs">%t%</u></h3>'.replace('%t%', title);
			 for (var i = 0; i < rows.length; i++) {
			 bodyhtml += '<p>' + rows[i].text + '</p>' +
			 '<div style="height: 1px;background-color: #5a5a5a;width: 100%"></div>';

			 }
			 console.log(bodyhtml);
			 res.end(bodyhtml);
			 */
		});
	});
});

/* GET home page. */
router.get('/', function (req, res, next) {

//    res.render('index', {req: req, randTopicid: 1});
	
	//  return;
	
	
	var mainPageHtml = getPageWithMaster('index', req, 'codershub');
	stQuery = "select * from topics";
	connection.query(stQuery, function (err, rows) {
		if (err) console.log(err);
		var tophtml = "";
		for (var i = 0; i < rows.length; i++) {
			var bean =
				'<i onclick="getTopic(%id%)" style="color: #f3f3f3">' + rows[i].title + '</i>' +
				'<div style="width: 100%;height: 1px;margin: 10px 0px 10px 0px; background-color: #8f8f8f"></div>';
			'<br>';
			bean = bean.replace('%id%', rows[i].idtopic);
			tophtml += bean;
		}
		mainPageHtml = mainPageHtml.replace('%topics%', tophtml);
		res.end(mainPageHtml);
	});
	
});

router.get('/loss', function (req, res) {
	//var page = getPageWithMaster('lostpass', req, "ne ara unuttun hemen..");
	
	res.render('singleMessage', {mes: "geçmiş olsun. "})
});

router.post('/createtopic', function (req, res) {
	if (req.session.username == undefined) {
		res.redirect('/');
		return;
	}
	
	var title = req.body.title;
	var tags = req.body.tags;
	var type = req.body.type;
	var content = req.body.content;
	
	if (title == "" || content == "") {
		res.redirect('/createtopic');
		return;
	}
	var topic = {
		title: title,
		userid: req.session.userid
	};
	
	connection.query("insert into topics set ? ", topic, function (err, trows) {
		if (err) console.log(err);
		var mes = {
			text: content,
			postuserid: req.session.userid,
			posttopicid: trows.insertId
		};
		connection.query("insert into post set ? ", mes, function (merr, mrows) {
			res.redirect('/?q=' + trows.insertId);
		});
	});
});

router.get('/editpost', function (req, res) {
	var id = req.query.pipi;
	connection.query("select * from post where idpost = ? ", [id], function (err, rows) {
		if (err) console.log(err);
		var post = rows[0];
		if (post.postuserid != req.session.userid) {
			res.render('singleMessage', {title: "Yavaş", mes: "Yapma böyle şeyler. Seni anasayfaya alalım."})
			return;
		}
		res.render('editpost', {post: post});
	});
});
router.post('/editpost', function (req, res) {
	//console.log(req.body);
	connection.query("update post set text = ? where idpost = ? ", [req.body.body, req.body.postid], function (err, updateRes) {
		if (err) console.log(err);
		res.redirect('/?post=' + req.body.postid);
	});
});

router.get('/createtopic', function (req, res) {
	if (req.session.username == undefined) {
		res.redirect('/');
		return;
	}
	
	
	//var mainpage = getPageWithMaster('bean/createtopic', req, 'Yeni Konu Aç'); //getMainPageHtml('Yeni Konu Aç');
	//res.end(mainpage);
	res.render('createTopic')
	
});

router.post('/giveans', function (req, res) {
	console.log(req.body);
	if (req.session.userid == undefined) {
		res.redirect('/');
		return;
	}
	
	var post = {
		text: req.body.ansbody.trim(),
		posttopicid: req.body.topicid,
		postuserid: req.session.userid,
		point: 0
	};
	
	
	connection.query("insert into post set ?", post, function (err, insres) {
		if (err) console.log(err);
		res.redirect('/?q=' + req.body.topicid);
	});
});

router.get('/register', function (req, res) {
	//var page = getPageWithMaster('register', req, "Yeni Üye");
	
	//res.end(page);
});

router.post('/register', function (request, res, next) {
	var mail = request.body.email;
	var user = request.body.username;
	
	var mainPageHtml = "";
	/* if (user == "" || typeof user != typeof "str") {
	 mainPageHtml = getMainPageHtml("olmadi", "username i boş bıraktın ya da o tarz bişiy.");
	 res.end(mainPageHtml);
	 return;
	 }

	 if (mail.indexOf('@') < 0) {
	 mainPageHtml = getMainPageHtml("olmadi", "e postada bi sıkıntı var.");
	 res.end(mainPageHtml);
	 return;
	 }
	 */
	//şifreyi ve kaydı oluştur , bilgileri mail at.
	
	sendfirsttouchmail(mail, user, function (restext) {
		
		if (restext == 'fail') {
			res.render('singleMessage', {
				title: "Olmadı :(",
				mes: "E postan daha önce vardı ya da diğer klişe sorunlardan birisi oluştu. Olsun! Yılma tekrar dene!"
			})
		}
		else {
			res.render('singleMessage', {
				title: "Hoşgeldin! :)",
				mes: "Hola! Şifre oluşturup e postana yolladık.Onunla giriş yapabilirsin.Şimdi anasayfaya dönebilirsin."
			})
		}
	});
});

router.get('/ajax/getloginform', function (req, res) {
	res.render('login')
});


router.get('/login', function (req, res) {
	//res.redirect('/');
	res.render('login');
});
router.post('/login', function (request, res, next) {
	
	var username = request.body.username;
	var pass = request.body.pass;
	
	connection.query("select * from users where nick = ? and pass = ?", [username, pass], function (err, rows) {
		if (err) console.log(err);
		if (rows.length < 1) {
			res.redirect('/');
			return;
		}
		
		request.session.userid = rows[0].iduser;
		request.session.username = rows[0].nick;
		request.session.save();
		
		console.log("* * * login: " + rows[0].iduser + "  " + rows[0].nick);
		res.redirect('/');
		
	})
});


router.get('/out', function (req, res) {
	req.session.destroy(); // = null;
	res.redirect('/'); //end("oturum silindi.");
});


//ikisinden de kurtulduk !!!!
function getPageWithMaster(page, req, title) {
	var mainPageHtml = String(fs.readFileSync(path.join(__dirname, './../views/mainPage.html')));
	var page = String(fs.readFileSync(path.join(__dirname, './../views/' + page + '.html')));
	mainPageHtml = mainPageHtml.replace('%content%', page);
	if (req.session.userid == undefined) {
		mainPageHtml = mainPageHtml.replace('%sessionform%', getpagehtml('bean/loginform'));
	} else {
		var seshtml =
			'<a style="color: #f3f3f3" href="/profile">%un%</a><br>'.replace('%un%', req.session.username) +
			'<a href="/createtopic" ><button>Konu AÇ</button></a><br>' +
			'<a href="/out" ><button>Çıkış</button></a>';
		mainPageHtml = mainPageHtml.replace('%sessionform%', seshtml);
	}
	mainPageHtml = mainPageHtml.replace('%title%', title);
	return mainPageHtml;
}

function getpagehtml(page) {
	return String(fs.readFileSync(path.join(__dirname, './../views/' + page + '.html')));
}


function sendfirsttouchmail(address, nick, resfunc) {
	// create reusable transporter object using SMTP transport
	
	var pass = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-*0123456789";
	
	for (var i = 0; i < 7; i++)
		pass += possible.charAt(Math.floor(Math.random() * possible.length));
	
	var sQuery = "select * from users where nick = '%nick%' or email = '%address%' ";
	sQuery = sQuery.replace("%nick%", nick).replace("%address%", address);
	connection.query(sQuery, function (err, rows) {
		if (err) {
			resfunc('fail');
			console.log(err);
			return;
		}
		
		if (rows.length > 0) {
			resfunc('fail');
			return;
		}
		var user = {
			nick: nick,
			pass: pass,
			email: address,
			regdate: " NOW() ",
			level: 0
		};
		var iQuery = "insert into users set ?";
		connection.query(iQuery, user, function (err, rows) {
			if (err) {
				console.log(err);
				resfunc('fail');
				return;
			}
			else {
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: '104a131a106a255@gmail.com',
						pass: 'mailkk99**'
					}
				});
				var mailOptions = {
					from: 'TerminalSystem ✔ <x@104.131.106.255:3009>', // sender address
					to: address, //'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
					subject: 'Selam. Şifreni yolladık.', // Subject line
					//text: 'Seninle tanışmak hoş olacaktır. Şuraya iliştirdiğimiz şifre ile girebilirsin. İstersen bi ara değiştir.', // plaintext body
					html: 'Seninle tanışmak hoş olacaktır. ' +
					'<br> Şuraya iliştirdiğimiz şifre ile girebilirsin. İstersen bi ara değiştir.' +
					'<br> Şifre: ' + pass // html body
				};
				transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
						return console.log(error);
					}
					console.log('Message sent: ' + info.response);
				});
				resfunc('ok');
				return;
			}
		})
	});
}
