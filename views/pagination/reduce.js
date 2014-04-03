function (keys, values, rereduce) {
	if (rereduce) {
		log('!! rereduce');
	}
	var arr = [];
	for (var i in keys) {
		arr.push(keys[i][1]);
	}

	return arr;
}
