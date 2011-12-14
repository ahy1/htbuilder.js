

exports.equals=function(a1, a2, err_cb) {
	if(a1===a2) return null;
	else {
		return err_cb(a1, a2);
	}
};
