import { currentUser } from "@clerk/nextjs/server";
import { isAdminIdentity } from "@/lib/auth";
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import SocialProof from "./components/landing/SocialProof";
import Features from "./components/landing/Features";
import HowItWorks from "./components/landing/HowItWorks";
import ProductPreview from "./components/landing/ProductPreview";
import Pricing from "./components/landing/Pricing";
import Testimonials from "./components/landing/Testimonials";
import FAQ from "./components/landing/FAQ";
import FinalCta from "./components/landing/FinalCta";
import Footer from "./components/landing/Footer";

export default async function Home() {
  const clerkUser = await currentUser();
  const isAdmin = isAdminIdentity({
    userId: clerkUser?.id,
    email: clerkUser?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] transition-colors duration-500">
      <Navbar isAdmin={isAdmin} />
      <main className="overflow-hidden">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <ProductPreview />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCta />
        <Footer />
      </main>
    </div>
  );
}

