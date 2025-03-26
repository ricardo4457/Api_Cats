class RequestMatchCats {
  constructor(string) {
    this.string = string;
  }

  isValid() {
    return (
      this.string && typeof this.string === "string" && this.string.length > 0
    );
  }
}

module.exports = RequestMatchCats;
