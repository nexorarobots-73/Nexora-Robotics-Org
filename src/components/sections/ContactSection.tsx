import { ContactForm } from '@/components/ContactForm';

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Let’s Build the Future Together</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind, a question, or just want to connect? Drop us a line.
          </p>
        </div>
        <div className="mx-auto w-full max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
