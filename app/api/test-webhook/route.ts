import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    message: 'Webhook endpoint is reachable!',
    timestamp: new Date().toISOString(),
    url: request.url
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  return NextResponse.json({ 
    message: 'Webhook POST received!',
    body: body,
    timestamp: new Date().toISOString()
  });
}
