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
    // availableID.sort((a, b) => a - b);

    // if the length of list is less than the last digit in th
    if (articleInstances.length < availableID[articleInstances.length - 1]) {
      for (let i = 1; i < availableID[articleInstances.length - 1]; i++) {
        if (availableID.includes(i)) {
          continue;
        } else {
          newArticle.setId(i);
          break;
        }
      }
    }
  }
  return newArticle;
};

const addArticle = async (title, paragraph) => {
  const fileDate = await loadJsonFile();

  const articleInstances = fileDate.map((item) => {
    return Article.newInstance(item);
  });
  // console.log(articleInstances);

  const newArticle = createArticle(title, paragraph, articleInstances);
  articleInstances.push(newArticle);

  await saveJsonFile(articleInstances);
  return newArticle;
};

export { addArticle };
