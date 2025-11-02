import { Features } from "@/components/marketing/features";
import { Hero } from "@/components/marketing/hero";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <Features />
    </div>
  );
}
