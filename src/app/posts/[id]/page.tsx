import { getAllPostIds, getPostData } from "@/lib/posts"
import Head from "next/head"
import postStyles from "../../../styles/Post.module.css"

// `generateStaticParams`가 반환한 `params`를 사용하여 이 페이지의 여러 버전이 정적으로 생성됩니다.
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  console.log('params', params)

  const { id } = await params // Next 15에서는 `params`와 같은 API가 비동기적으로 만들어졌습니다. 따라서 `await` 동적 API를 사용하여 해당 속성에 액세스해야 합니다.

  const postData: {
    title: string
    date: string
    contentHtml: string
  } = await getPostData(id as string) // 빌드 시점에 호출됩니다.

  return (
    <div className={postStyles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  )
}

// `generateStaticParams` 함수는 동적 경로 세그먼트와 함께 사용되어 요청 시점이 아닌 빌드 시점에 경로를 정적으로 생성합니다.
export function generateStaticParams() {
  const paths = getAllPostIds()
  console.log('paths', paths)

  // [id] 동적 세그먼트를 채우기 위한 'params' 목록을 반환합니다.
  return paths.map((path: { id: string }) => ({
    id: path.id
  }))
}

export const dynamicParams = false
