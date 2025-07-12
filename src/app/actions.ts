'use server';

import { analyzeInput } from '@/ai/flows/form-input-analyzer';
import type { AnalyzeInputOutput } from '@/ai/flows/form-input-analyzer';
import { z } from 'zod';

export type AnalysisResult = AnalyzeInputOutput & { error?: string };

export async function analyzeMessageAction(text: string): Promise<AnalysisResult | null> {
    if (text.trim().length < 20) {
        return null;
    }
    try {
        const result = await analyzeInput({ text });
        return result;
    } catch (error) {
        console.error('AI analysis failed:', error);
        return { error: 'Failed to analyze message.', suggestions: [], inconsistencies: [], isOkay: false };
    }
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export async function submitContactFormAction(data: unknown) {
  const validatedFields = contactFormSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors and try again.'
    };
  }

  // In a real application, you would send an email or save to a database.
  console.log('New contact form submission:', validatedFields.data);

  return { success: true, message: "Thanks for reaching out! We'll get back to you soon." };
}
