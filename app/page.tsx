import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <Link href="/dashboard">
      <Button>Go to dashboard</Button>
    </Link>
  );
};

export default HomePage;
