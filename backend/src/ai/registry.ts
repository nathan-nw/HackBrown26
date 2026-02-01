import { portfolioAllowlist } from './portfolioAllowlist';

interface PromptDefinition {
  kind: string;
  version: string;
  buildPrompt: (payload: any) => { system: string; user: string };
}

const patternMatchPrompt: PromptDefinition = {
  kind: 'pattern_match',
  version: 'v1',
  buildPrompt: (payload: any) => {
    const { ideaDraft } = payload;
    const nicheWedge = ideaDraft.wedge || '';
    const name = ideaDraft.name || 'Startup';
    const description = ideaDraft.description || '';
    const differentiation = ideaDraft.differentiation || '';

    const system = `You are a partner at Sequoia Capital. Your job is to pattern match new startup ideas against the legendary Sequoia portfolio.
    
    You have an allowlist of companies: ${portfolioAllowlist.join(', ')}.
    You MUST return a JSON object with exactly this structure:
    {
      "narrow": {"company": "Name from allowlist", "sentence": "One sentence comparison (max 25 words)."},
      "wide": {"company": "Name from allowlist", "sentence": "One sentence comparison (max 25 words)."},
      "why": "One sentence explaining why this pattern matters (max 25 words)."
    }

    Rules:
    1. Only use companies from the allowlist.
    2. "narrow" should match the specific wedge/niche.
    3. "wide" should match the broader market/behavior change.
    4. If unsure, use "None" for company and explain unsureness in sentence.
    5. Output valid JSON only. Do not wrap in markdown blocks.`;

    const user = `Analyze this startup idea:
    Name: ${name}
    Description: ${description}
    Niche Wedge: ${nicheWedge}
    Differentiation: ${differentiation}
    
    Provide the pattern match JSON.`;

    return { system, user };
  },
};

export const registry: Record<string, PromptDefinition> = {
  pattern_match: patternMatchPrompt,
};
