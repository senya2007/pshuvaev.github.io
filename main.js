var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var copydir = require('copy-dir');
var nunjucks = require('nunjucks')

var path = "./";

fs.readdir(path+"pages", function(err, items) {
	rimraf(path+'out', function(){
		mkdirp(path+'out', function(){
			for (var i=0; i<items.length; i++) {
				var out = nunjucks.render(path+"pages/"+items[i]);
				fs.writeFile(path+"out/"+items[i], out, function(err) {if(err) {console.log(err);}});
			}
			
			copydir.sync(path + "data", path+"out");
		});
	});
});