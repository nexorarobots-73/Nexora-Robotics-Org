import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Rocket, Globe, BrainCircuit } from 'lucide-react';

const stats = [
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    label: "2025 Goal",
    value: "Launch 3 autonomous platforms"
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    label: "2026+ Expansion",
    value: "Collaborate with 10+ global partners"
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    label: "Research Focus",
    value: "AI + Robotics + Human-Centered Design"
  }
];

export function GrowthSection() {
  return (
    <section id="growth" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Roadmap for Growth</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our strategic roadmap is focused on innovation, collaboration, and scalable impact.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
