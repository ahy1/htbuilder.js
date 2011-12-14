var asserts=require('./asserts'), ht=require('../lib/htbuilder');

var test_head_title=function() {
	var html1=ht.doc(ht.element('html',
		ht.element('head',
			ht.element('title', 
				ht.text('Title')))));
	var html2=ht.doc(ht.element('html', ht.head_title('Title')));

	console.log('Testing the head_title function');

	asserts.equals(html1.getString(), html2.getString(), function(actual, expected) {
		console.log('Emitted HTML is not exactly equal. Actual text: ['+actual+'], expected: ['+expected+']');
	});
	
};

exports.run=function() {
	test_head_title();
};
