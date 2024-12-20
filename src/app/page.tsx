import Head from "next/head";
import homeStyles from "../styles/Home.module.css";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import Logo from "../components/Logo"

export default function Home() {
  const allPostsData = getSortedPostsData() // 빌드 시점에 호출됩니다.

  return (
    <div className={homeStyles.container}>
      <Head>
        <title>Sehyeong Cho</title>
      </Head>
      <Logo />
      <section className={homeStyles.headingMd}>
        <p className={homeStyles.textCenter}>Sehyeong Cho</p>
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
