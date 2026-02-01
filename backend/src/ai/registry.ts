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

const planningReportPrompt: PromptDefinition = {
  kind: 'planning_report',
  version: 'v1',
  buildPrompt: (payload: any) => {
    const { ideaMeta, canvas } = payload;
    const title = ideaMeta?.title || 'Unnamed Idea';
    const description = ideaMeta?.description || '';
    const wedge = ideaMeta?.wedge || '';
    const differentiation = ideaMeta?.differentiation || '';
    const category = ideaMeta?.category || '';
    const stage = ideaMeta?.stage || '';
    const nodes = canvas?.nodes || [];
    const edges = canvas?.edges || [];

    // Serialize canvas data for the prompt
    const nodesSummary = nodes.map((n: any) => `${n.data?.type || 'Node'}: ${n.data?.label || n.data?.title || 'Unlabeled'}`).join('; ');

    const system = `You are a senior partner at a top-tier VC. You analyze startup planning canvases and provide strategic feedback.

You MUST return a JSON object with exactly this structure:
{
  "strategicFit": { "score": 0-100, "text": "..." },
  "suggestedAction": { "title": "...", "body": "..." },
  "marketRisk": { "label": "Low"|"Medium"|"High", "text": "..." },
  "considerations": [
    { "question": "...", "indicators": "...", "resolution": "..." }
  ]
}

Constraints:
- strategicFit.text: max 30 words
- suggestedAction.title: max 6 words
- suggestedAction.body: max 20 words
- marketRisk.text: max 25 words
- considerations: exactly 2 or 3 items
- each consideration field: max 18 words

For "considerations", pick 2-3 from this ARC PMF Terrifying Questions framework:
Q1: "What is my company's right to exist?"
  Indicators: "Founder advantage becomes clear; market wedge reveals itself; productive pivots."
  Resolution: "Conviction for a decade-plus; willing to recruit a best friend."
Q2: "Do people care enough?"
  Indicators: "Cold outreach converts; customers pound the table; request specific solutions."
  Resolution: "Design partners."
Q3: "Does my product actually change behavior?"
  Indicators: "Lightbulb moment in demo; feature becomes sticky; power user behavior."
  Resolution: "Engaged and retained users."
Q4: "Will customers pay enough to build a business?"
  Indicators: "Don't balk at price; fast contract review; conversion to paid tier."
  Resolution: "Paying customers; envelope math to $500M."

Tailor each chosen question to the specific idea. Do not invent new questions.
If insufficient info, produce conservative scores and note missing info briefly.
Output valid JSON only. Do not wrap in markdown.`;

    const user = `Analyze this startup planning canvas:

Idea: ${title}
Description: ${description}
Wedge: ${wedge}
Differentiation: ${differentiation}
Category: ${category}
Stage: ${stage}

Canvas Nodes: ${nodesSummary || 'No nodes defined yet'}
Canvas Edges: ${edges.length} connections

Provide the strategic report JSON.`;

    return { system, user };
  },
}

export const registry: Record<string, PromptDefinition> = {
  pattern_match: patternMatchPrompt,
  planning_report: planningReportPrompt,
};
