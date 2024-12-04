import Head from "next/head";
import homeStyles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import { getSortedPostsData } from "@/lib/posts";

export default function Home({ allPostsData }: {
  allPostsData: {
    id: string
    date: string
    title: string
  }[]
}) {
  return (
    <div>
      <Head>
        <title>Sehyeong Cho</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Sehyeong Cho Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={homeStyles.listItem} key={id}>
              <a>{title}</a>
              <br />
              <small className={homeStyles.lightText}>
                {date}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}