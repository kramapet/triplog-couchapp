function (doc) {
	if (doc.class == 'route') {
		emit(doc.published_at, {
			'class': doc.class,
			'title': doc.title,
			'geo': doc.geo,
			'published_at': doc.published_at
		});
	}
}
