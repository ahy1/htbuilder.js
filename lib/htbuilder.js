

var encode_text=function(raw_txt) {
	return String(raw_txt).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

exports.element=function(element_name) {
	var attrs=[];
	var cont=[];

	var add_array=function(sub_objects) {
		var i;
		for(i=0; i<sub_objects.length; ++i) {
			var a=sub_objects[i];
			if(a.type=='attribute') {
				attrs.push(a);	
			} else if(a.type=='element' || a.type=='text') {
				cont.push(a);
			} else if(a.type=='map') {
				add_array(a.arr);
			}
		}
	};
	var args=Array.prototype.slice.call(arguments, 1);
	add_array(args);

	return {
		type: 'element',
		name: element_name,
		attributes: attrs,
		content: cont,
		getString: function() {
			var ret='<'+element_name;
			
			var a;
			attrs.forEach(function(a) {
				ret+=' '+a.getString();
			});

			ret+='>';

			var c;
			cont.forEach(function(c) {
				ret+=c.getString();
			});

			ret+='</'+element_name+'>';

			return ret;
		},
		write: function(stream) {
			stream.write('<');
			stream.write(element_name);

			var a;
			attrs.forEach(function(a) {
				a.write(stream);
			});
			
			stream.write('>');

			var c;
			cont.forEach(function(c) {
				c.write(stream);
			});

			stream.write('</');
			stream.write(element_name);
			stream.write('>');
		}
	};
}

exports.attribute=function(attr_name, attr_value) {
	return {
		type: 'attribute',
		name: attr_name,
		value: attr_value,
		getString: function() {
			return attr_name+'=\"'+attr_value+'\"';
		},
		write: function(stream) {
			stream.write(attr_name);
			stream.write('=\"');
			stream.write(attr_value);
			stream_write('\"');
		}
	};
}

exports.text=function(text) {
	return {
		type: 'text',
		content: text,
		getString: function() {
			return encode_text(text);
		},
		write: function(stream) {
			stream.write(encode_text(text));
		}
	};
}

exports.doc=function(doc_root) {
	return {
		root: doc_root,
		getString: function() {
			return '<!DOCTYPE html>\r\n'+doc_root.getString();
		},
		write: function(stream) {
			stream.write('<!DOCTYPE html\r\n');
			doc_root.write(stream);
		}
	};
};

// Support

// Map elements in an array to a function
exports.map=function(arr, cb) {
	var map_arr=[];
	var i;
	for(i=0; i<arr.length; ++i) {
		var a=cb(arr[i]);
		map_arr.push(a);
	}
	return {type: 'map', arr: map_arr};
};

// Map properties of an object to a function
exports.objectMap=function(o, cb) {
	var map_arr=[];
	var name;
	for(name in o) {
		var a=cb(name, o[name]);
		map_arr.push(a);
	}
	return {type: 'map', arr: map_arr};
};

// Utility functions

exports.head_title=function(title) {
	return exports.element('head', 
		exports.element('title', exports.text(title)));
};

exports.a=function(uri, text) {
	return exports.element('a', 
		exports.attribute('href', uri), 
		exports.text(text));
};

exports.img=function(uri, width, height, alt) {
	return exports.element('img', 
		exports.attribute('src', uri),
		exports.attribute('width', width),
		exports.attribute('height', height),
		exports.attribute('alt', alt));
};

exports.a_img=function(link_uri, image_uri, width, height, alt) {
	return exports.element('a',
		exports.attribute('href', link_uri),
		exports.img(image_uri, width, height, alt));
};

exports.th=function(text) {
	return exports.element('th', 
		exports.text(text));
};

exports.td=function(text) {
	return exports.element('td', 
		exports.text(text));
};

exports.tr_th=function() {
	var arr=Array.prototype.slice.call(arguments);
	return exports.element('tr', 
		exports.map(arr, function(item) {
			return exports.th(item);
		}));
};

exports.tr_td=function() {
	var arr=Array.prototype.slice.call(arguments);
	return exports.element('tr', 
		exports.map(arr, function(item) {
			return exports.td(item);
		}));
};

