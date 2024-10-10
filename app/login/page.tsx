'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

import LoginForm from '@/components/auth/login-form';
import { ModeToggle } from '@/components/mode-toggle';
import { Card, CardHeader } from '@/components/ui/card';

const Login: React.FC = () => {
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' ? '/logo_big_dark_mode.svg' : '/logo_big.svg';

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md dark:border-input">
        <CardHeader className="space-y-1 flex flex-col items-center mt-2">
          <Image src={logoSrc} alt="logo" width={300} height={70} />
          <p className="pt-4 text-sm">Sign in to your account to continue</p>
        </CardHeader>
        <LoginForm />
      </Card>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Login;
