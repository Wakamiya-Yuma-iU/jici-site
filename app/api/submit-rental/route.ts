import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, studentNumber, pickupDateTime, returnTime, rentalItems } = data;

  if (!Array.isArray(rentalItems) || rentalItems.length === 0) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'アイテムが選択されていません',
      },
      {
        status: 400,
      },
    );
  }

  const slackMessage = {
    text: [
      '新しい備品のレンタルがリクエストされました',
      `氏名: ${name}`,
      `学籍番号: ${studentNumber}`,
      `希望の受け取り日時: ${pickupDateTime}`,
      `返却時間: ${returnTime}`,
      ...rentalItems.map((item: any) => `アイテム: ${item.name}, 数量: ${item.quantity}`),
    ].join('\n'),
  };

  const result = await fetch(process.env.SLACK_WEBHOOK_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(slackMessage),
  });

  if (result.ok) {
    return NextResponse.json({ status: 'success' });
  } else {
    return NextResponse.json({ status: 'error', message: 'Slackへの投稿に失敗しました' });
  }
}

export const runtime = 'edge';
