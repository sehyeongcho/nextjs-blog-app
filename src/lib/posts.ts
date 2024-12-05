import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src\\posts");
console.log("process.cwd()", process.cwd());
console.log("postsDirectory", postsDirectory);

export function getSortedPostsData() {
  // Reads the contents of the directory. (src/posts)
  const fileNames = fs.readdirSync(postsDirectory);
  console.log("fileNames", fileNames);

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);

    // Synchronously reads the entire contents of a file.
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    return {
      id: fileName.replace(/\.md$/, '')
    }
  })
}