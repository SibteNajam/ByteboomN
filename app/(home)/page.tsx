import NavBar from '@/components/home/NavBar';
import HeroChapter from '@/components/home/HeroChapter';
import TrustChapter from '@/components/home/TrustChapter';
import BotsChapter from '@/components/home/BotsChapter';
import JourneyChapter from '@/components/home/JourneyChapter';
import PricingChapter from '@/components/home/PricingChapter';
import SecurityChapter from '@/components/home/SecurityChapter';
import EdgeChapter from '@/components/home/EdgeChapter';
import AboutChapter from '@/components/home/AboutChapter';
import ScrollTail from '@/components/home/ScrollTail';
import SvgSprite from '@/components/home/SvgSprite';

/** Server page — JourneyChapter stays a server component so stations.js
    can mutate mockup DOM without React wiping is-live / img src on render. */
export default function Page() {
  return (
    <>
      <NavBar />
      <HeroChapter />
      <TrustChapter />
      <BotsChapter />
      <JourneyChapter />
      <PricingChapter />
      <SecurityChapter />
      <EdgeChapter />
      <AboutChapter />
      <ScrollTail />
      <SvgSprite />
    </>
  );
}
