// use server'
'use server';
/**
 * @fileOverview Analyzes form input, suggests improvements, and flags inconsistencies.
 *
 * - analyzeInput - Analyzes the input and returns suggestions and flags.
 * - AnalyzeInputInput - The input type for the analyzeInput function.
 * - AnalyzeInputOutput - The return type for the analyzeInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeInputInputSchema = z.object({
  text: z.string().describe('The text input from the form to be analyzed.'),
});
export type AnalyzeInputInput = z.infer<typeof AnalyzeInputInputSchema>;

const AnalyzeInputOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('Suggestions for improving the text input.'),
  inconsistencies: z.array(z.string()).describe('Inconsistencies or potential issues in the text.'),
  isOkay: z.boolean().describe('Indicates whether the input is fine without any suggestions or issues.'),
});
export type AnalyzeInputOutput = z.infer<typeof AnalyzeInputOutputSchema>;

export async function analyzeInput(input: AnalyzeInputInput): Promise<AnalyzeInputOutput> {
  return analyzeInputFlow(input);
}

const analyzeInputPrompt = ai.definePrompt({
  name: 'analyzeInputPrompt',
  input: {schema: AnalyzeInputInputSchema},
  output: {schema: AnalyzeInputOutputSchema},
  prompt: `You are an AI assistant designed to analyze user input from a contact form.
  Your goal is to identify potential issues, suggest improvements, and ensure the message is clear and effective.

  Analyze the following text:
  {{text}}

  Provide suggestions for improving the text, flag any inconsistencies or potential issues, and indicate whether the input is fine without any suggestions or issues.
  If the text is fine without issues, set isOkay to true, and leave suggestions and inconsistencies empty.
  `,
});

const analyzeInputFlow = ai.defineFlow(
  {
    name: 'analyzeInputFlow',
    inputSchema: AnalyzeInputInputSchema,
    outputSchema: AnalyzeInputOutputSchema,
  },
  async input => {
    const {output} = await analyzeInputPrompt(input);
    return output!;
  }
);
