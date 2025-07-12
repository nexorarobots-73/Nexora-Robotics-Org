import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100dvh-56px)] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,hsl(var(--primary)/0.15),transparent)]"></div>

      <div className="container relative z-10 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground">
          Welcome to <span className="text-primary">NEXORA</span> ROBOTICS
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Engineering Future Intelligence — One Bot at a Time
        </p>
        <Button size="lg" asChild className="text-lg">
          <Link href="mailto:nexora.robots@gmail.com">Get in Touch</Link>
        </Button>
      </div>
    </section>
  );
}
