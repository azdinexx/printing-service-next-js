import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function GET(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get('token');
  const data = {
    valid: false,
  };
  if (token) {
    jwt.verify(token.value, process.env.JWT_SECRET!, function (err, decoded) {
      if (err) {
        // error handling
        return NextResponse.json({ data }, { status: 200 });
      }
      data.valid = true;
      return NextResponse.json({ data }, { status: 200 });
    });
  }
  return NextResponse.json({ data }, { status: 200 });
}
