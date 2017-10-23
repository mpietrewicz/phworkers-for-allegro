//every worker gets unique port, get it from a process environment variables
var system = require("system");
var port = system.env['PHANTOM_WORKER_PORT'];
var host = system.env['PHANTOM_WORKER_HOST'];

require('webserver').create().listen(host + ':' + port, function (req, res) {
  console.log(host);
  console.log(port);
	//standard phantomjs script which get input parametrs from request
	var page = require('webpage').create();
  var settings = {
  operation: "POST",
  encoding: "utf-8",
  headers: {
    "Content-Type": "application/json"
    },
  loadImages: false,
  javascriptEnabled: false
  };
  var url = 'https://allegro.pl/kategoria/osobowe-audi-4031?order=m';
  // page.open(req.post.url, function(status) {
	page.open(url, settings, function(status) {
    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
      var content = page.evaluate(function(){

        var text = [];
        $("h2:contains('lista promowanych ofert')").parents("section").find("article").each(function()
        {
        	text.push($(this).find("h2 a").text());
          text.push($(this).find("h2 a").attr("href"));
        	text.push($(this).find("div div span span:contains(' zł')").text());
        });

        return text;
      });



  		//write the result to the response
  		res.statusCode = 200;
  		res.setHeader('Content-Type', 'application/json');
  	  res.write(JSON.stringify({ content: content }));
  	  res.close();

  	});
	});
});
