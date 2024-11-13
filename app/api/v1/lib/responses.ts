import { NextResponse } from 'next/server';

type ApiResponse<T> = {
  status: number;
  success: boolean;
  data?: T | null;
} & ({ error: { message: string }; data: null } | { error?: never; data: T });

export function successResponse<T>(data: T, status: number = 200): NextResponse {
  const response: ApiResponse<T> = {
    status,
    success: true,
    data,
  };

  return NextResponse.json(response, { status });
}

export function errorResponse(message: string, status: number = 500): NextResponse {
  const response: ApiResponse<null> = {
    status,
    success: false,
    data: null,
    error: { message },
  };

  return NextResponse.json(response, { status });
}

export function createdResponse<T>(data: T): NextResponse {
  return successResponse(data, 201);
}

export function notFoundResponse(message: string): NextResponse {
  return errorResponse(message, 404);
}
