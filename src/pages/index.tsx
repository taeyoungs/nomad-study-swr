import { Inter } from 'next/font/google';
import useSWR from 'swr';

import { getDogVideo } from '@/api';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data: video, mutate } = useSWR('dogVideo', getDogVideo, {
    revalidateOnFocus: false,
  });

  const handleClickNewButton = () => {
    mutate();
  };

  const handleClickLikeButton = () => {
    if (!video) {
      return;
    }

    mutate({ ...video, isLiked: !video?.isLiked }, { revalidate: false });
  };

  return (
    <main className={`flex min-h-screen flex-col p-24 ${inter.className}`}>
      <section>
        <h1 className="mb-10 text-3xl font-bold">Woof.tv</h1>
        <div className="bg-gray-100	flex flex-col items-center p-10">
          <div className="mb-6">
            <video autoPlay controls loop src={video?.url}></video>
          </div>
          <div className="flex gap-2 w-full">
            <button
              className="w-full py-4 bg-white rounded-md hover:drop-shadow-lg transition-all font-semibold"
              onClick={handleClickNewButton}
            >
              New Dog!
            </button>
            <button
              className="w-full py-4 bg-sky-400 rounded-md text-white hover:drop-shadow-lg transition-all font-semibold"
              onClick={handleClickLikeButton}
            >
              {video?.isLiked ? 'Unlike' : `Like`}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
