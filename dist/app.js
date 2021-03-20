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
