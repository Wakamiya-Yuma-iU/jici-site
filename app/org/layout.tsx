import Hero from '@/app/_components/Hero';
import Sheet from '@/app/_components/Sheet';

export const metadata = {
  title: '委員会一覧｜学友会【iU 情報経営イノベーション専門職大学】',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="org-list" sub="委員会一覧" />
      <Sheet>{children}</Sheet>
    </>
  );
}
