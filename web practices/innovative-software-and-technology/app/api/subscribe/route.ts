import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // TO INTEGRATE WITH MAILCHIMP:
    // 1. Get your API Key and List ID from Mailchimp
    // 2. Use the fetch() call below:
    /*
    const DATACENTER = process.env.MAILCHIMP_API_KEY.split('-')[1];
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    });
    */

    // For now, we simulate a successful subscription
    console.log(`Subscribing email: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
