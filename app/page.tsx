import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturedListings from '@/components/sections/FeaturedListings';
import AreasGrid from '@/components/sections/AreasGrid';
import WhySamSalem from '@/components/sections/WhySamSalem';
import AchievementsSection from '@/components/sections/AchievementsSection';
import Testimonials from '@/components/sections/Testimonials';
import LatestNews from '@/components/sections/LatestNews';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedListings />
      <AreasGrid />
      <WhySamSalem />
      <AchievementsSection />
      <Testimonials />
      <LatestNews />
      <ContactCTA />
    </>
  );
}
