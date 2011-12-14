
var asserts=require('./asserts'), ht=require('../lib/htbuilder');

exports.run=function() {
	var html=ht.doc(ht.element('html'));

	console.log('Testing basic HTML output');

	asserts.equals(html.getString(),
'<!DOCTYPE html>\r\n\
<html></html>',
		function(actual, expected) {
			console.log('Emitted HTML is not exactly as expected. Actual text: ['+actual+'], expexted: ['+expected+']');
		});
};

