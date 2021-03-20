function ProverbsVerses(elem, data) {
	this.data = data;
	this.selectedChapterIndex = +localStorage.getItem('chapterIndex') || 0;
	this.selectedMapIndex = +localStorage.getItem('mapIndex') || 0;
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

ProverbsVerses.prototype.toggleBookmark = function() {
  const outline = document.getElementById("bookmark-outline");
  const filled = document.getElementById("bookmark-filled");
  const isBookmarked = outline.style.display === 'none';
  if(isBookmarked) {
      outline.style.display = 'block';
      filled.style.display = 'none';
  } else {
    outline.style.display = 'none';
    filled.style.display = 'block';
  }
}

ProverbsVerses.prototype.render = function() {
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

ProverbsVerses.prototype.homeScreenTemplate = function(data) {
	return [

	].join("\n");
}