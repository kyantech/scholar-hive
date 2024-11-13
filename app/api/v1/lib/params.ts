import { NextRequest } from 'next/server';

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export function getParams(req: NextRequest): PaginationParams {
  const searchParams = new URL(req.url).searchParams;
  return {
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '10'),
    search: searchParams.get('search') || undefined,
  };
}
