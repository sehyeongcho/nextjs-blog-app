import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypeAddClasses from "rehype-add-classes";

const postsDirectory = path.join(process.cwd(), "src/posts");

export function getSortedPostsData() {
  // 디렉토리의 내용을 읽습니다. (src/posts)
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);

    // 파일의 전체 내용을 동기적으로 읽습니다.
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

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true }) // HTML 태그 허용
    .use(rehypeRaw) // HTML 태그를 파싱
    .use(rehypeAddClasses, {
      'h1, h2, h3, p, ul, a': 'markdown'
    })
    .use(rehypeStringify) // HTML로 변환
    .process(matterResult.content)
  
  console.log('sehyeong', processedContent)

  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}
