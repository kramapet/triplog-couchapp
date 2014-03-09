function (doc) {
	if (doc.class == 'post') {
		emit(doc.published_at, {'title': doc.title, 'published_at': doc.published_at, 'body': doc.body });
	}
}
