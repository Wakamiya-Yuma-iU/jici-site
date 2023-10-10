import Hero from '@/app/_components/Hero';
import Sheet from '@/app/_components/Sheet';

export const metadata = {
  title: '配布資料｜学友会【iU 情報経営イノベーション専門職大学】',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Document" sub="配布資料" />
      <Sheet>{children}</Sheet>
    </>
  );
}
