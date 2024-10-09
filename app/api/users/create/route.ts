import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const clerkUser = await clerkClient.users.getUser(userId);
    console.log(clerkUser);

    let dbUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: userId,
        },
      });
    }

    return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL as string);
  } catch (error) {
    console.error('Error in auth creation route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
