import {FC} from 'react';
import {H1, H3} from '@/app/components/Polyfills';

export const FeedBanner: FC = () => (
  <div
    className="w-full bg-[url(/images/feed-v1.jpg)] bg-cover text-center py-24 px-8 rounded-xl"
  >
    <H3 className="font-poppins text-neutralPure font-extralight tracking-widest">SUPPORT THE MUSIC YOU LOVE</H3>
    <H1 className="font-martian text-neutralPure text-[48px] py-12 leading-[48px]">SUPPORT & EARN</H1>
    <H3 className="font-poppins text-neutralPure font-extralight tracking-widest py-2">Fund artists directly through on-chain campaigns</H3>
    <H3 className="font-poppins text-neutralPure font-extralight tracking-widest">Earn early & exclusive access, artistic influence and other rewards</H3>
  </div>
);
