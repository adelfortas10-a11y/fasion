import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductScroller from '@/components/ProductScroller';
import Craftsmanship from '@/components/Craftsmanship';
import Lookbook from '@/components/Lookbook';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="relative w-full bg-void-500">
      <Navbar />
      <Hero />
      <ProductScroller />
      <Craftsmanship />
      <Lookbook />
      <CTASection />
    </main>
  );
}
