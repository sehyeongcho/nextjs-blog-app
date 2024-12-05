import Head from "next/head";
import homeStyles from "../styles/Home.module.css";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const allPostsData = getSortedPostsData()

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
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
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
