function (newDoc, oldDoc, userCtx, secCtx) {
	
	var is_admin = function (user, security) {
		security.admins = security.admins || {};
		security.admins.roles = security.admins.roles || [];
		security.admins.names = security.admins.names || [];

		if (security.admins.names.indexOf(user.name) > -1) {
			return true;
		}

		for (var x in user.roles) {
			if (security.admins.roles.indexOf(user.roles[x]) > -1) {
				return true;
			}
		}

		throw({'forbidden': 'Document cannot be changed (user do not have admin role)'});
	};
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

	is_admin(userCtx, secCtx);

	require('class');
	require('title');
	require('url');
	require('body');
	require('published_at');

	switch (newDoc.class) {
		case 'route':
			require('geo');
			break;
		case 'photo':
			require('photoDescription');
			break;
	}

	validate_class(newDoc.class);
	validate_date(newDoc.published_at);
}
