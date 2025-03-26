class RequestGetTags {
  constructor(query) {
    this.query = query;
  }

  isValid() {
    return this.query;
  }
}

module.exports = RequestGetTags;
