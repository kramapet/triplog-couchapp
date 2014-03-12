function (newDoc, oldDoc, userCtx) {
	/*
	var unchanged = function (field) {
		if (oldDoc && toJSON(oldDoc[field]) != toJSON(newDoc[field])) {
			throw({ 'forbidden': 'Field cannot be changed: ' + field });
		}
	};
	*/

	var validate_class = function (cls) {
		var classes = {
			'post': true,
			'photo': true,
			'route': true
		};

		if (!classes[cls]) {
			throw({ 'forbidden': 'Invalid class: ' + cls });
		}
	}

	var validate_date = function (timestamp) {
		if (Object.prototype.toString.call(timestamp) !== '[object Array]') {
			throw({ 'forbidden': 'timestamp must be an Array' }); 
		} else if (timestamp.length != 6) {
			throw({ 'forbidden': 'timestamp must contain 6 items' });
		} else {
			for (var i = 0; i < timestamp.length; ++i) {
				if (timestamp[i] < 0) {
					throw({ 'forbidden': 'timestamp values must be greater or equal to zero' });
				}
			}
		}
	};

	var require = function (field, message) {
		message = message || 'Document must have a ' + field;
		if (!newDoc[field]) {
			throw ({ 'forbidden': message });
		}
	};

	require('class');
	require('title');
	require('url');
	require('body');
	require('published_at');

	if (newDoc.class == 'route') {
		require('geometry');
	}

	validate_class(newDoc.class);
	validate_date(newDoc.published_at);
}
