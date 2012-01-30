var asserts=require('./asserts'), ht=require('../lib/htbuilder');

var test_map=function() {
	var arr=['a', 1];
	var html1=ht.element('body', ht.map(arr, function(e) {return ht.element('p', ht.text(e))}));
	var html2=ht.element('body', 
		ht.element('p', ht.text('a')),
		ht.element('p', ht.text(1)));

	console.log('Testing the map function');

	asserts.equals(html1.getString(), html2.getString(), function(actual, expected) {
		console.log('Emitted HTML is not exactly equal. Actual text: ['+actual+'], expected: ['+expected+']');
	});
};

var test_objectMap=function() {
	var o={name1: 'value1', name2: 'value2'};
	var html1=ht.element('body', ht.objectMap(o, function(name, value) {return ht.element('p', ht.text(name+'='+value))}));
	var html2=ht.element('body', 
		ht.element('p', ht.text('name1=value1')),
		ht.element('p', ht.text('name2=value2')));

	console.log('Testing the objectMap function');

	asserts.equals(html1.getString(), html2.getString(), function(actual, expected) {
		console.log('Emitted HTML is not exactly equal. Actual text: ['+actual+'], expected: ['+expected+']');
	});
};

exports.run=function() {
	test_map();
	test_objectMap();
};
