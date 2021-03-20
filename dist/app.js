function ProverbsVerses(elem, data) {
	this.data = data;
	this.selectedChapterIndex = +localStorage.getItem('chapterIndex') || 0;
	this.selectedMapIndex = +localStorage.getItem('mapIndex') || 0;
  this.isBookmarked(this.selectedChapterIndex,this.selectedMapIndex);
	this.elem = elem;
}

ProverbsVerses.prototype.nextChapterIndex = function() {
	if ((this.selectedChapterIndex + 1) >= this.data.chapters.length) {
    this.setChapterIndex(0);
	} else {
    this.setChapterIndex(this.selectedChapterIndex + 1);
	}
}

ProverbsVerses.prototype.prevChapterIndex = function() {
	if ((this.selectedChapterIndex - 1) < 0) {
		this.selectedChapterIndex = this.data.chapters.length - 1;
	} else {
    this.setChapterIndex(this.selectedChapterIndex - 1);
	}
}

ProverbsVerses.prototype.next = function() {
	if ((this.selectedMapIndex + 1) >= this.data.map[this.selectedChapterIndex].length) {
		this.nextChapterIndex();
    this.setMapIndex(0);
	} else {
    this.setMapIndex(this.selectedMapIndex + 1);
	}

	this.render();
}

ProverbsVerses.prototype.prev = function() {
	if ((this.selectedMapIndex - 1) < 0) {
		this.prevChapterIndex();
		this.selectedMapIndex = this.data.map[this.selectedChapterIndex].length - 1;
	} else {
    this.setMapIndex(this.selectedMapIndex - 1);
	}

	this.render();
}

ProverbsVerses.prototype.setChapterIndex = function(index) {
  this.selectedChapterIndex = index;
  localStorage.setItem('chapterIndex', this.selectedChapterIndex);
}

ProverbsVerses.prototype.setMapIndex = function(index) {
  this.selectedMapIndex = index;
  localStorage.setItem('mapIndex', this.selectedMapIndex);
}

ProverbsVerses.prototype.isBookmarked = function(chapterIndex, mapIndex) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");
  const id = `${chapterIndex}:${mapIndex}`;
  const foundIndex = bookmarks.map(b => b.id).indexOf(id);

  const outline = document.getElementById("bookmark-outline");
  const filled = document.getElementById("bookmark-filled");

  if(foundIndex > -1) {
    outline.style.display = 'none';
    filled.style.display = 'block';
  } else {
    outline.style.display = 'block';
    filled.style.display = 'none';
  }

  return foundIndex > -1;
}

ProverbsVerses.prototype.toggleBookmark = function() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || "[]");

  if(this.isBookmarked(this.selectedChapterIndex, this.selectedMapIndex)) {
      const id = `${this.selectedChapterIndex}:${this.selectedMapIndex}`;
      const foundIndex = bookmarks.map(b => b.id).indexOf(id);
      bookmarks.splice(foundIndex, 1);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    const newBookmark = {
      id: `${this.selectedChapterIndex}:${this.selectedMapIndex}`,
      chapterIndex: this.selectedChapterIndex,
      mapIndex: this.selectedMapIndex
    };
    bookmarks.push(newBookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  this.isBookmarked(this.selectedChapterIndex, this.selectedMapIndex);
}

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
}

ProverbsVerses.prototype.template = function(data) {
	var textSizeClass = this.getTextSizeClass(data.verses);
	return [
		[
			'<h2>',
				data.book + ' <span id="reference-chapter">'+ data.chapterNum +'</span>:',
				'<span id="reference-verse">'+ data.startVerse +'</span>',
				(data.endVerse ? ' - <span>'+ data.endVerse +'</span>' : ''),
			'</h2>'
		].join(""),
		'<div class="verses '+ textSizeClass +'">',
			data.verses.map(function(verse) { return '<h1>'+verse.text+'</h1>'}).join("\n"),
		'</div>',
	].join("\n");
}

ProverbsVerses.prototype.getTextSizeClass = function(verses) {
	// Adjust these variables as needed
	var CHAR_PER_LINE = 40;
	var MAX = 20;
	var NORMAL = 12;
	// ***********************

	var textSize = "text-normal";
	var lineCount = verses.reduce(function(count, verse) {
		return (count + Math.ceil(verse.text.length / CHAR_PER_LINE)) + 1;
	}, 0);

	console.log(lineCount);

	if (lineCount > MAX) {
		textSize = "text-small";
	} else if (lineCount > NORMAL) {
		textSize = "text-med";
	}

	return textSize;
}
<<<<<<< HEAD

ProverbsVerses.prototype.homeScreenTemplate = function(data) {
	return [

	].join("\n");
}
=======
>>>>>>> 2a9f204cbf409f3e29791ca4d5663bf48c51b455
