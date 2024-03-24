import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const { secretKey } = await request.json();

  if (!secretKey) {
    return new Response(
      JSON.stringify({ message: 'Secret key  is required' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  } else if (secretKey !== process.env.MY_SECRET_KEY) {
    return new Response(JSON.stringify({ message: 'Invalid secret key' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 401,
    });
  } else {
    const token = jwt.sign({ secretKey }, process.env.JWT_SECRET as string, {
      expiresIn: '30d',
    });
    return new Response(JSON.stringify({ message: 'loggedin successfully' }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`,
      },
    });
  }
}
