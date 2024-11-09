import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const GET = auth(async function GET(req) {
  if (!req.auth?.user?.email) {
    return NextResponse.json(
      {
        status: 401,
        success: false,
        error: { message: 'Not Authenticated' },
      },
      { status: 401 }
    );
  }

  try {
    const baseUser = await prisma.user.findUnique({
      where: { email: req.auth.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!baseUser) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          error: { message: 'User not found' },
        },
        { status: 404 }
      );
    }

    let userWithDetails;

    switch (baseUser.role) {
      case 'admin':
        userWithDetails = baseUser;
        break;

      case 'teacher':
        userWithDetails = await prisma.user.findUnique({
          where: { email: req.auth.user.email },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            teacherDetails: {
              include: {
                subjects: true,
                classes: true,
              },
            },
          },
        });
        break;

      case 'parent':
        userWithDetails = await prisma.user.findUnique({
          where: { email: req.auth.user.email },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            parentDetails: {
              include: {
                students: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        email: true,
                        studentDetails: {
                          include: {
                            class: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });
        break;

      case 'student':
        userWithDetails = await prisma.user.findUnique({
          where: { email: req.auth.user.email },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            studentDetails: {
              include: {
                class: true,
              },
            },
          },
        });
        break;

      default:
        userWithDetails = baseUser;
    }

    return NextResponse.json({
      status: 200,
      success: true,
      data: { user: userWithDetails },
      error: null,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: { message: error.message },
      },
      { status: 500 }
    );
  }
});
