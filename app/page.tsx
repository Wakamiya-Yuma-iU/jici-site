import Image from 'next/image';
import { getNewsList } from '@/app/_libs/microcms';
import { TOP_NEWS_LIMIT } from '@/app/_constants';
import NewsList from '@/app/_components/NewsList';
import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';

export const revalidate = 60;

export default async function Page() {
  const data = await getNewsList({
    limit: TOP_NEWS_LIMIT,
  });
  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>iU自治委員会</h1>
          <p className={styles.description}>
            学友会員すべてに利益ある活動、それを支えるための運営・管理を図ります。
          </p>
        </div>
        <Image
          className={styles.bgimg}
          src="/img-mav.jpg"
          alt=""
          width={3600}
          height={1200}
          priority
        />
      </section>
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>News</h2>
        <NewsList articles={data.contents} />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっとみる</ButtonLink>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.horizontal}>
          <div>
            <h2 className={styles.sectionTitleEn}>Activities</h2>
            <p className={styles.sectionTitleJa}>活動の詳細</p>
            <p className={styles.sectionDescription}>
              週に一度の定例会議、3階の学友会倉庫の管理、任意サークルの設立受付、公認サークルの審議と認可など、さまざまな活動を展開しています。
            </p>
            <ButtonLink href="/activities">もっとみる</ButtonLink>
          </div>
          <Image
            className={styles.businessImg}
            src="/image1.jpg"
            alt=""
            width={1024}
            height={1024}
          />
        </div>
      </section>
      <div className={styles.aboutus}>
        <section className={styles.section}>
          <div className={styles.horizontal}>
            <Image
              className={styles.aboutusImg}
              src="/img-aboutus.jpg"
              alt=""
              width={6000}
              height={4000}
            />
            <div>
              <h2 className={styles.sectionTitleEn}>Organization</h2>
              <p className={styles.sectionTitleJa}>組織体制</p>
              <p className={styles.sectionDescription}>
                本部長１名・副本部長１名・会計２名、そして委員３名から成り立っています。
              </p>
              <dl className={styles.info}>
                <dt className={styles.infoTitle}>名称</dt>
                <dd className={styles.infoDescription}>iU自治委員会</dd>
              </dl>
              <dl className={styles.info}>
                <dt className={styles.infoTitle}>活動開始</dt>
                <dd className={styles.infoDescription}>20XX年4月</dd>
              </dl>
              <dl className={styles.info}>
                <dt className={styles.infoTitle}>担当場所</dt>
                <dd className={styles.infoDescription}>
                  iUキャンパス3階
                  <br />
                  学友会部屋
                </dd>
              </dl>
            </div>
          </div>
        </section>
      </div>
      <section className={styles.section}>
        <div className={styles.horizontal}>
          <div>
            <h2 className={styles.sectionTitleEn}>Initiatives</h2>
            <p className={styles.sectionTitleJa}>さらなる取り組み</p>
            <p className={styles.sectionDescription}>
              学生たちの大学生活の質を向上させるための様々な活動を展開しています。
            </p>
            <ButtonLink href="/initiatives">もっとみる</ButtonLink>
          </div>
          <Image
            className={styles.hiringImg}
            src="/img-initiatives.jpg"
            alt=""
            width={960}
            height={960}
          />
        </div>
      </section>
    </>
  );
}
