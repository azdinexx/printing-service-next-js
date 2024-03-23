import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const POST = async (req: NextRequest) => {
  const form = await req.json();
  const secretKey = form.secretKey as string;
  if (!secretKey) {
    return NextResponse.json({ error: 'Secret key is required' });
  }

  if (secretKey === process.env.MY_SECRET_KEY) {
    const token = jwt.sign({ secretKey }, process.env.JWT_SECRET as string);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`,
      },
    });
  }
};
