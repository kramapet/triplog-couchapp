function (doc) {
	obj = {
		'class': doc.class,
		'title': doc.title,
		'url': doc.url,
		'body': doc.body,
		'published_at': doc.published_at,
	};

	if (doc.class == 'route') {
		obj.geometry = doc.geometry;
	}

	emit(doc.published_at, obj);
}
