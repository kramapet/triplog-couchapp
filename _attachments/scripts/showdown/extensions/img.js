(function () {
	var img = function (converter) {
		return [
			{
				'type': 'lang',
				'regex': '%img\\{(\\S+) ([^}]+)\\}',
				'replace': function (match, src, alt) {
					return "<img src=\"/object/" + converter.ctxId + "/" + src + "\" alt=\"" + alt + "\">";
				}
			}
		];
	};

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.img = img; }
    // Server-side export
    if (typeof module !== 'undefined') module.exports = img;
}());
