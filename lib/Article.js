// We may have to look into random identification... And also to make sure the said random number isn't repeated

class Article {
  // static instanceCounter = 0; // this may have to go
  constructor(title, paragraph) {
    this.id = Math.floor(Math.random() * 10000);
    this.title = title;
    this.paragraph = paragraph;
    this.status = this.paragraph.length > 20 ? "Publish" : "Draft";
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  setId(id) {
    this.id = id;
  }

  setStatus(status) {
    this.status = status;
  }

  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  #setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }

  #setUpdatedAt(updatedAt) {
    this.updatedAt = updatedAt;
  }

  static oldInstance(t) {
    let temp = new Article(t.title, t.paragraph);
    temp.setId(t.id);
    temp.#setCreatedAt(t.createdAt);
    temp.#setUpdatedAt(t.updatedAt);
    return temp;
  }
}

export { Article };
