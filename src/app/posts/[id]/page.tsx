import { getAllPostIds, getPostData } from "@/lib/posts"

export default async function Post({ params }: { params: { id: string } }) {
  console.log('params', params)
  
  const postData: {
      title: string
      date: string
      contentHtml: string
  } = await getPostData(params.id as string)

  return (
    <div>
      <title>{postData.title}</title>
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
