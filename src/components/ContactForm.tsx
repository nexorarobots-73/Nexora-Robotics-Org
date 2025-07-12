'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition, useCallback, useEffect } from 'react';
import { analyzeMessageAction, submitContactFormAction, type AnalysisResult } from '@/app/actions';
import { Loader, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const messageValue = form.watch('message');

  const debouncedAnalyze = useCallback(
    (message: string) => {
      if (message.trim().length >= 20) {
        setIsAnalyzing(true);
        startTransition(async () => {
          const result = await analyzeMessageAction(message);
          setAnalysisResult(result);
          setIsAnalyzing(false);
        });
      } else {
        setAnalysisResult(null);
      }
    },
    []
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedAnalyze(messageValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [messageValue, debouncedAnalyze]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
        const result = await submitContactFormAction(values);
        if (result.success) {
            toast({
                title: "Message Sent!",
                description: result.message,
            });
            form.reset();
            setAnalysisResult(null);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.message,
            });
        }
    });
  }
  
  const renderAnalysis = () => {
    if (isAnalyzing) {
      return <div className="flex items-center text-sm text-muted-foreground mt-2"><Loader className="mr-2 h-4 w-4 animate-spin" />Analyzing your message...</div>;
    }
    if (!analysisResult) return null;
    if (analysisResult.error) {
      return <div className="flex items-center text-sm text-destructive mt-2"><AlertTriangle className="mr-2 h-4 w-4" />{analysisResult.error}</div>;
    }
    if (analysisResult.isOkay) {
      return <div className="flex items-center text-sm text-success mt-2"><CheckCircle2 className="mr-2 h-4 w-4" />Your message looks clear and concise.</div>;
    }
    return (
      <div className="space-y-2 mt-2">
        {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
          <div className="flex items-start text-sm text-warning">
            <Lightbulb className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Suggestions:</p>
              <ul className="list-disc pl-5">
                {analysisResult.suggestions.map((s, i) => <li key={`s-${i}`}>{s}</li>)}
              </ul>
            </div>
          </div>
        )}
        {analysisResult.inconsistencies && analysisResult.inconsistencies.length > 0 && (
          <div className="flex items-start text-sm text-destructive">
            <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Potential Issues:</p>
              <ul className="list-disc pl-5">
                {analysisResult.inconsistencies.map((i, idx) => <li key={`i-${idx}`}>{i}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 bg-secondary/30">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                    <Textarea
                    placeholder="Tell us how we can build the future together..."
                    className="min-h-[150px]"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                {renderAnalysis()}
                </FormItem>
            )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Send
            </Button>
        </form>
        </Form>
    </Card>
  );
}
