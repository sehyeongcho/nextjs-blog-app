import { getAllPostIds, getPostData } from "@/lib/posts"

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
      {postData.title}
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
