import { Article } from "../lib/Article.js";
import {
  saveJsonFile,
  loadJsonFile,
  outputFilePath,
} from "./handle_data_file.js";

const createArticle = (title, paragraph, articleInstances) => {
  const newArticle = new Article(title, paragraph);

  // Properties of theis function may have to change. because random ID might have to be implemented
  if (articleInstances.length !== 0) {
    const availableID = articleInstances.map((item) => item.id);

    // if article id already exists
    if (availableID.filter((item) => item === newArticle.id).length > 1) {
      newArticle.setId(Math.floor(Math.random() * 10000) + 10000);
    }
  }
  return newArticle;
};

const addArticle = async (title, paragraph) => {
  const fileDate = await loadJsonFile();

  const articleInstances = fileDate.map((item) => {
    return Article.oldInstance(item);
  });
  // console.log(articleInstances);

  const newArticle = createArticle(title, paragraph, articleInstances);
  articleInstances.push(newArticle);

  await saveJsonFile(articleInstances);
  return newArticle;
};

const loadAllArticles = async () => {
  const fileData = await loadJsonFile();
  return fileData;
};

export { addArticle, loadAllArticles };
