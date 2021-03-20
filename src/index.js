class HackathonTest {
  constructor() {
    this.elem = window.document.getElementById("test");
  }

  write(text) {
    console.log("write");
    this.elem.innerHTML = `${text}`;
  }
}

const hack = new HackathonTest();
hack.write("Dead Sea!");