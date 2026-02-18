// We may have to look into random identification... And also to make sure the said random number isn't repeated

class Article {
  static instanceCounter = 0; // this may have to go
  constructor(title, paragraph) {
    this.id = ++Article.instanceCounter;
    this.title = title;
    this.paragraph = paragraph;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  setId(id) {
    this.id = id;
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

  static newInstance(t) {
    let temp = new Article(t.title, t.paragraph);
    temp.setId(t.id);
    temp.#setCreatedAt(t.createdAt);
    temp.#setUpdatedAt(t.updatedAt);
    return temp;
  }
}

export { Article };
