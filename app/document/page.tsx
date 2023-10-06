import Image from 'next/image';
import { getDocumentList } from '@/app/_libs/microcms';
import styles from './page.module.css';
import ButtonLink from '@/app/_components/ButtonLink';
export const runtime = 'edge';


type Props = {
  searchParams: {
    dk: string;
  };
};

export const revalidate = 60;

export default async function Page({ searchParams }: Props) {
  const data = await getDocumentList({
    draftKey: searchParams.dk,
  });
  return (
    <div className={styles.container}>
      {data.contents.length === 0 ? (
        <p className={styles.empty}>資料が登録されていません。</p>
      ) : (
        <ul>
          {data.contents.map((doc) => (
            <li key={doc.id} className={styles.list}>
              <dl className={styles.flex}>
                <dt className={styles.name}>{doc.title}</dt>
                <dd className={styles.description}>{doc.explain}</dd>
                <dd className={styles.action}>
                  <ButtonLink href={doc.url} isExternal>
                    資料を見る
                  </ButtonLink>
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.footer}>
        <h2 className={styles.message}>We are hiring</h2>
        <p>私たちは共にチャレンジする仲間を募集しています。</p>
        <ButtonLink href="">採用情報へ</ButtonLink>
      </div>
    </div>
  );
}
