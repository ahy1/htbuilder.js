

exports.element=function(element_name) {
	var attrs=[];
	var cont=[];

	var add_array=function(sub_objects) {
		var i;
		for(i=0; i<sub_objects.length; ++i) {
			console.log('element()::add_array(): i='+i);
			var a=sub_objects[i];
			if(a.type=="attribute") {
				attrs.push(a);	
			} else if(a.type=="element" || a.type=="text") {
				cont.push(a);
			} else if(a.type=='map') {
				add_array(a.arr);
			}
		}
	};
	var args=Array.prototype.slice.call(arguments, 1);
	add_array(args);

	return {
		type: "element",
		name: element_name,
		attributes: attrs,
		content: cont,
		getString: function() {
			var ret="<"+element_name;

			attrs.forEach(function(a) {
				ret+=" "+a.getString();
			});

			ret+=">";

			cont.forEach(function(c) {
				ret+=c.getString();
			});

			ret+="</"+element_name+">";

			return ret;
		}
	};
}

exports.attribute=function(attr_name, attr_value) {
	return {
		type: "attribute",
		name: attr_name,
		value: attr_value,
		getString: function() {
			return attr_name+"\""+attr_value+"\"";
		}
	};
}

exports.text=function(text) {
	return {
		type: "text",
		content: text,
		getString: function() {
			return text;
		}
	};
}

exports.doc=function(doc_root) {
	return {
		root: doc_root,
		getString: function() {
			return doc_root.getString();
		}
	};
};

// Support

exports.map=function(arr, cb) {
	var map_arr=[];
	var i;
	for(i=0; i<arr.length; ++i) {
		var a=cb(arr[i]);
		map_arr.push(a);
	}
	return {type: 'map', arr: map_arr};
};

// Utility functions

exports.head_title=function(title) {
	return exports.element('head', exports.element('title', exports.text(title)));
};

exports.th=function(text) {
	return exports.element('th', exports.text(text));
};

exports.td=function(text) {
	return exports.element('td', exports.text(text));
};

exports.tr_th=function() {
	var arr=Array.prototype.slice.call(arguments);
	return exports.element('tr', exports.map(arr, function(item) {return exports.th(item);}));
};

exports.tr_td=function() {
	var arr=Array.prototype.slice.call(arguments);
	return exports.element('tr', exports.map(arr, function(item) {return exports.td(item);}));
};

