'use server';

import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { signIn, signOut } from '@/auth';

export const logout = async () => {
  await signOut({ redirectTo: '/' });
  revalidatePath('/');
};

export const loginWithCreds = async ({ email, password }: { email: string; password: string }) => {
  try {
    await signIn('credentials', { email, password, redirectTo: '/admin' });
    revalidatePath('/admin');
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
  revalidatePath('/');
};
