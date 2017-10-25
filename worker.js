var phantom = require("phantom-workers")({
	pathToPhantomScript: "script.js",
	workerEnv: {
	  operation: "POST",
	  encoding: "utf-8",
	  headers: {
	    "Content-Type": "application/json"
	    },
	  loadImages: false,
	  javascriptEnabled: false
	},
	timeout: 10000,
	numberOfWorkers: 10
	portLeftBoundary: 8080,
	portRightBoundary: 8081
});

phantom.start(function(startErr) {
	if (startErr) {
		return console.error('Error while starting workers:', startErr);
	}

	phantom.execute({ url: "http://www.google.pl/" }, function(err, res) {
		if (err) {
			return console.error('Error while executing:', err);
		}

		console.log(res.title);
	});
});
