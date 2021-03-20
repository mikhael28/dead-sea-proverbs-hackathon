class HackathonTest {
  constructor() {
    console.log("constructor");
  }

  log(...args) {
    console.log(...args)
  }
}

const hack = new HackathonTest();
hack.log("hello there!");