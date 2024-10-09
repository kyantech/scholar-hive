import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await clerkClient.users.getUserList();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users from Clerk:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
