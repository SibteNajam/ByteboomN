'use client';

import WorldLayer from './WorldLayer';
import NavBar from './NavBar';
import HeroChapter from './HeroChapter';
import TrustChapter from './TrustChapter';
import BotsChapter from './BotsChapter';
import JourneyChapter from './JourneyChapter';
import PricingChapter from './PricingChapter';
import SecurityChapter from './SecurityChapter';
import EdgeChapter from './EdgeChapter';
import AboutChapter from './AboutChapter';
import ScrollTail from './ScrollTail';
import SvgSprite from './SvgSprite';

export default function HomePage() {
  return (
    <>
      <WorldLayer />
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
