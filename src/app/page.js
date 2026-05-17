import Hero from '../components/Hero/Hero';
import SketchMeet from '../components/SketchMeet/SketchMeet';
import FeaturedArtists from '../components/FeaturedArtists/FeaturedArtists';
import RecentSketches from '../components/RecentSketches/RecentSketches';
import AboutCommunity from '../components/AboutCommunity/AboutCommunity';
import BlogHighlights from '../components/BlogHighlights/BlogHighlights';
import WhatsAppCTA from '../components/WhatsAppCTA/WhatsAppCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SketchMeet />
      <FeaturedArtists />
      <RecentSketches />
      <AboutCommunity />
      <BlogHighlights />
      <WhatsAppCTA />
    </>
  );
}