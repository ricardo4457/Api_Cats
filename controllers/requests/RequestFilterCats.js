class RequestFilterCats {
  constructor(tag, omit, total) {
    this.tag = tag;
    this.omit = omit;
    this.total = total;
  }

  isValid() {
    return this.tag && !isNaN(this.omit) && !isNaN(this.total);
  }
}

module.exports = RequestFilterCats;
