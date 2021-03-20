let versCount = 1;

function showLastVerse() {
  versCount--;
  document.getElementById("reference-verse").innerText = '' + versCount;
  showVerse(0,versCount);
}

function showNextVerse() {
  versCount++;
  document.getElementById("reference-verse").innerText = '' + versCount;
  showVerse(0,versCount);
}

function showVerse(chapter, verse) {
  document.getElementById("verse-a").innerText = proverbs.chapters[0].verses[verse].text;
}
