import { auth } from './auth';

const HomePage = async () => {
  const session = await auth();
  console.log('session', session?.user);
  return <div>{session?.user?.name}</div>;
};

export default HomePage;
