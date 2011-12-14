
/* This example program generates an HTML page containing a table of file names in the current directory */

var ht=require('../lib/htbuilder'), fs=require('fs');

(function(){
	fs.readdir('.', function(err, filenames) {
		var html=ht.doc(
			ht.element('html',
				ht.head_title('Directory listing'),
				ht.element('body',
					ht.element('table', 
						ht.tr_th('File name'),
						ht.map(filenames, function(filename) {
							return ht.tr_td(filename);
						})))));
		console.log(html.getString());
	});
})();
