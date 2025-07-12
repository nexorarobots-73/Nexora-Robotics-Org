import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export function MissionSection() {
  return (
    <section id="mission" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4 md:px-6">
        <div className="flex justify-center md:order-last">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Co-Founder's Mission</h2>
            <p className="text-lg text-muted-foreground">
              We’re building a smart robotic future — not just as engineers, but as ethical technologists. Our mission is to drive practical innovation in defense, healthcare, and environmental robotics through continuous R&D and open-source collaboration. Growth for us means empowering developers, uplifting underserved communities, and building scalable tools for real-world problems.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
            <Card className="overflow-hidden shadow-2xl shadow-primary/10">
                <CardContent className="p-0">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Co-Founder's Mission"
                    width={600}
                    height={400}
                    className="object-cover aspect-video transition-transform duration-500 hover:scale-105"
                    data-ai-hint="mission robotics"
                />
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
