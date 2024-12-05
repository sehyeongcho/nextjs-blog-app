import { getAllPostIds, getPostData } from "@/lib/posts"
import Head from "next/head"

export default async function Post({ params }: { params: { id: string } }) {
  console.log('params', params)

  const { id } = await params

  const postData: {
    title: string
    date: string
    contentHtml: string
  } = await getPostData(id as string)

  return (
    <div>
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

export function generateStaticParams() {
  const paths = getAllPostIds()
  console.log('paths', paths)

  return paths.map((path: { id: string }) => ({
    id: path.id
  }))
}
