import { Loader2Icon } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <section className={'w-full h-screen flex flex-col justify-center items-center'}>
      <Loader2Icon className={'animate-spin w-12 h-12 text-primary'} />
    </section>
  );
};
export default LoadingScreen;
