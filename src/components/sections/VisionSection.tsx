import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export function VisionSection() {
  return (
    <section id="vision" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Founder's Vision</h2>
          <p className="text-lg text-muted-foreground">
            At NEXORA, we envision a world where robotics seamlessly integrate into human life — enhancing capability, autonomy, and sustainability. Our mission is to bring the power of intelligent machines to everyone, everywhere. Founded with a belief in AI-powered empathy and engineering elegance, we aim to redefine what’s possible.
          </p>
        </div>
        <div className="flex justify-center">
        </div>
      </div>
    </section>
  );
}
