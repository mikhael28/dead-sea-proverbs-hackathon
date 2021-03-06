function ProverbsVerses(elem, data) {
	this.data = data;
	this.selectedChapterIndex = +localStorage.getItem('chapterIndex') || 0;
	this.selectedMapIndex = +localStorage.getItem('mapIndex') || 0;
	this.isBookmarked(this.selectedChapterIndex, this.selectedMapIndex);
	this.elem = elem;
}

ProverbsVerses.prototype.nextChapterIndex = function() {
	if (this.selectedChapterIndex + 1 >= this.data.chapters.length) {
		this.setChapterIndex(0);
	} else {
		this.setChapterIndex(this.selectedChapterIndex + 1);
	}
};

ProverbsVerses.prototype.prevChapterIndex = function() {
	if (this.selectedChapterIndex - 1 < 0) {
		this.selectedChapterIndex = this.data.chapters.length - 1;
	} else {
		this.setChapterIndex(this.selectedChapterIndex - 1);
	}
};

ProverbsVerses.prototype.toTop = function() {
	window.scrollTo(0,0);
}

ProverbsVerses.prototype.next = function() {
	if (this.selectedMapIndex + 1 >= this.data.map[this.selectedChapterIndex].length) {
		this.nextChapterIndex();
		this.setMapIndex(0);
	} else {
		this.setMapIndex(this.selectedMapIndex + 1);
	}

	this.render();
	this.toTop();
};

ProverbsVerses.prototype.prev = function() {
	if (this.selectedMapIndex - 1 < 0) {
		this.prevChapterIndex();
		this.selectedMapIndex = this.data.map[this.selectedChapterIndex].length - 1;
	} else {
		this.setMapIndex(this.selectedMapIndex - 1);
	}

	this.render();
	this.toTop();
};

ProverbsVerses.prototype.setChapterIndex = function(index) {
	this.selectedChapterIndex = index;
	localStorage.setItem('chapterIndex', this.selectedChapterIndex);
};

ProverbsVerses.prototype.setMapIndex = function(index) {
	this.selectedMapIndex = index;
	localStorage.setItem('mapIndex', this.selectedMapIndex);
};

ProverbsVerses.prototype.isBookmarked = function(chapterIndex, mapIndex) {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
	var id = chapterIndex +':'+ mapIndex;
	var foundIndex = bookmarks.map(function (bookmark) { return bookmark.id }).indexOf(id);

	var outline = document.getElementById('bookmark-outline');
	var filled = document.getElementById('bookmark-filled');

	if (foundIndex > -1) {
		outline.style.display = 'none';
		filled.style.display = 'block';
	} else {
		outline.style.display = 'block';
		filled.style.display = 'none';
	}

	return foundIndex > -1;
};

ProverbsVerses.prototype.toggleBookmark = function() {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

	if (this.isBookmarked(this.selectedChapterIndex, this.selectedMapIndex)) {
		var id = this.selectedChapterIndex +':'+ this.selectedMapIndex;
		var foundIndex = bookmarks.map(function (bookmark) { return bookmark.id }).indexOf(id);
		bookmarks.splice(foundIndex, 1);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		var newBookmark = {
			id: this.selectedChapterIndex +':'+ this.selectedMapIndex,
			chapterIndex: this.selectedChapterIndex,
			mapIndex: this.selectedMapIndex
		};
		bookmarks.push(newBookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	this.isBookmarked(this.selectedChapterIndex, this.selectedMapIndex);
};

ProverbsVerses.prototype.render = function() {
	this.isBookmarked(this.selectedChapterIndex, this.selectedMapIndex);
	var chapter = this.data.chapters[this.selectedChapterIndex];
	var proverbsMap = this.data.map[this.selectedChapterIndex][this.selectedMapIndex];
	var startVerse = proverbsMap[0];
	var endVerse = proverbsMap[1];
	var verses = chapter.verses.slice(startVerse - 1, endVerse || startVerse);
	this.elem.innerHTML = this.template({
		book: this.data.book,
		chapterNum: chapter.chapter,
		verses: verses,
		startVerse: startVerse,
		endVerse: endVerse
	});
};

ProverbsVerses.prototype.template = function(data) {
	var textSizeClass = this.getTextSizeClass(data.verses);
	return [
		[
			'<h2>',
			data.book + ' <span id="reference-chapter">' + data.chapterNum + '</span>:',
			'<span id="reference-verse">' + data.startVerse + '</span>',
			data.endVerse ? ' - <span>' + data.endVerse + '</span>' : '',
			'</h2>'
		].join(''),
		'<div class="verses ' + textSizeClass + '">',
		data.verses
			.map(function(verse) {
				return '<p>' + verse.text + '</p>';
			})
			.join('\n'),
		'</div>'
	].join('\n');
};

ProverbsVerses.prototype.getTextSizeClass = function(verses) {
	// Adjust these variables as needed
	var CHAR_PER_LINE = 40;
	var MAX = 20;
	var NORMAL = 12;
	// ***********************

	var textSize = 'text-normal';
	var lineCount = verses.reduce(function(count, verse) {
		return count + Math.ceil(verse.text.length / CHAR_PER_LINE) + 1;
	}, 0);


	if (lineCount > MAX) {
		textSize = 'text-small';
	} else if (lineCount > NORMAL) {
		textSize = 'text-med';
	}

	return textSize;
}

ProverbsVerses.prototype.homeScreenTemplate = function(data) {
	return [

	].join("\n");
}

ProverbsVerses.prototype.toggleTheme = function() {
	var htmlElem = window.document.getElementsByTagName('html')[0];

	if (this.hasClass(htmlElem, "theme-handwriting")) {
		this.addClass(htmlElem, "theme-georgia");
		this.removeClass(htmlElem, "theme-handwriting");
	} else {
		this.addClass(htmlElem, "theme-handwriting");
		this.removeClass(htmlElem, "theme-georgia");
	}
}

// https://stackoverflow.com/questions/26736587/how-to-add-and-remove-classes-in-javascript-without-jquery

ProverbsVerses.prototype.hasClass = function(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    return !!(new RegExp('(\\s|^)' + className + '(\\s|$)')).exec(el.className);
}

ProverbsVerses.prototype.addClass = function(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!this.hasClass(el, className))
        el.className += " " + className;
}

ProverbsVerses.prototype.removeClass = function(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (this.hasClass(el, className))
    {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}
