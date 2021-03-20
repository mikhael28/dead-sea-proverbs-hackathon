let versCount = 1;

function showLastVerse() {
  versCount--;
  document.getElementById("counter").innerText = '' + versCount;
}

function showNextVerse() {
  versCount++;
  document.getElementById("counter").innerText = '' + versCount;
}
