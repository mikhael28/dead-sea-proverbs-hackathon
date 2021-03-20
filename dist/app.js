
/*
var indexOfFirstVerse = 1;

function showLastVerse() {
	// TODO if verse = 1 -> go to previous chapter
	if (indexOfFirstVerse > 0) {
		indexOfFirstVerse -= 2;
		showVerses();
	}
}

function showNextVerse() {
	// TODO if last verse -> go to next chapter
	indexOfFirstVerse += 2;
	showVerses();
}

function showVerses() {
	document.getElementById('reference-verse').innerText = '' + indexOfFirstVerse;
	document.getElementById('verse-a').innerText = proverbs.chapters[0].verses[indexOfFirstVerse].text;
	document.getElementById('verse-b').innerText = proverbs.chapters[0].verses[indexOfFirstVerse + 1].text;
}
*/

function ProverbsVerses(elem, data) {
	this.data = data;
	this.selectedChapterIndex = localStorage.getItem('chapterIndex') || 0;
	this.selectedMapIndex = localStorage.getItem('mapIndex') || 0;
	this.elem = elem;
}

ProverbsVerses.prototype.nextChapterIndex = function() {
	if ((this.selectedChapterIndex + 1) >= this.data.chapters.length) {
    this.setChapterIndex(0);
	} else {
    setChapterIndex(this.selectedChapterIndex + 1);
	}
}

ProverbsVerses.prototype.prevChapterIndex = function() {
	if ((this.selectedChapterIndex - 1) < 0) {
		this.selectedChapterIndex = this.data.chapters.length - 1;
	} else {
    setChapterIndex(this.selectedChapterIndex - 1);
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
	return [
		[
			'<h2>',
				data.book + ' <span id="reference-chapter">'+ data.chapterNum +'</span>:',
				'<span id="reference-verse">'+ data.startVerse +'</span>',
				(data.endVerse ? ' - <span>'+ data.endVerse +'</span>' : ''),
			'</h2>'
		].join(""),
		// '<hr style="width: 75%" />',
		'<div class="verses">',
			data.verses.map(function(verse) { return '<h1>'+verse.text+'</h1>'}).join("\n"),
		'</div>',
	].join("\n");
}
