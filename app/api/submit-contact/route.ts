import { NextRequest, NextResponse } from 'next/server';

function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function POST(request: NextRequest) {
  const json = await request.json();
  const { lastname, firstname, company, email, message } = json;
  if (!lastname) {
    return NextResponse.json(
      {
        status: 'error',
        message: '姓を入力してください',
      },
      {
        status: 400,
      },
    );
  }
  if (!firstname) {
    return NextResponse.json(
      {
        status: 'error',
        message: '名を入力してください',
      },
      {
        status: 400,
      },
    );
  }
  if (!company) {
    return NextResponse.json(
      {
        status: 'error',
        message: '会社名を入力してください',
      },
      {
        status: 400,
      },
    );
  }
  if (!email) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'メールアドレスを入力してください',
      },
      {
        status: 400,
      },
    );
  }
  if (!validateEmail(email)) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'メールアドレスの形式が誤っています',
      },
      {
        status: 400,
      },
    );
  }
  if (!message) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'メッセージを入力してください',
      },
      {
        status: 400,
      },
    );
  }
    const slackMessage = {
    text: [
      '新しいお問い合わせがありました',
    `姓: ${lastname}`,
    `名: ${firstname}`,
    `団体名: ${company}`,
    `メールアドレス: ${email}`,
    `メッセージ:`, 
    `${message}`
    ].join('\n')
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