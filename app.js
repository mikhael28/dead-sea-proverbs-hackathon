let indexOfCurrentVerse = 1;

function showLastVerse() {
  // TODO if verse = 1 -> go to previous chapter
  if (indexOfCurrentVerse > 0) {
    indexOfCurrentVerse--;
    showVerse(0, indexOfCurrentVerse);
  }
}

function showNextVerse() {
  // TODO if last verse -> go to next chapter
  indexOfCurrentVerse++;
  showVerse(0, indexOfCurrentVerse);
}

function showVerse(chapter, verse) {
  document.getElementById("reference-verse").innerText = '' + indexOfCurrentVerse;
  document.getElementById("verse-a").innerText = proverbs.chapters[0].verses[verse].text;
}
