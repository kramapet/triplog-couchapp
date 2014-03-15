function (doc) {
	obj = {
		'class': doc.class,
		'title': doc.title,
		'url': doc.url,
		'body': doc.body,
		'published_at': doc.published_at,
	};

	switch (doc.class) {
		case 'route':
			obj.geometry = doc.geometry;
			break;
		case 'photo':
			obj.photoDescription = doc.photoDescription;
			break;
	}

	emit(doc.url, obj);
}
