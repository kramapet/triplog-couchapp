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
			obj.geo = doc.geo;
			break;
		case 'photo':
			obj.photoDescription = doc.photoDescription;
			break;
	}

	emit(doc.published_at, null);
}
