// council-compare.mjs - Compare two approaches using AI council
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const MODELS = {
  architect: {
    name: "Claude Sonnet 4.5",
    model: "anthropic/claude-sonnet-4.5",
    focus: "Architecture & design patterns",
  },
  performance: {
    name: "DeepSeek R1",
    model: "deepseek/deepseek-r1",
    focus: "Performance & optimization",
  },
  security: {
    name: "GPT-4o",
    model: "openai/gpt-4o",
    focus: "Security & edge cases",
  },
  maintainability: {
    name: "Gemini Flash 2.0",
    model: "google/gemini-2.0-flash",
    focus: "Maintainability & DX",
  },
};

async function ask(model, prompt) {
  const res = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });
  return res.choices[0].message.content;
}

// Parse arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log(`
Usage: node council-compare.mjs <file1> <file2>
   or: node council-compare.mjs "approach A description" "approach B description"

Compares two code files or approaches from multiple expert perspectives:
  • Architecture & design patterns
  • Performance & optimization
  • Security & edge cases
  • Maintainability & developer experience

Examples:
  node council-compare.mjs middleware-v1.ts middleware-v2.ts
  node council-compare.mjs "Use Redux" "Use Zustand"
  `);
  process.exit(1);
}

let approachA = args[0];
let approachB = args[1];

// Try to read as files if they exist
if (fs.existsSync(approachA)) {
  approachA = `File: ${approachA}\n\`\`\`\n${fs.readFileSync(approachA, 'utf-8')}\n\`\`\``;
}
if (fs.existsSync(approachB)) {
  approachB = `File: ${approachB}\n\`\`\`\n${fs.readFileSync(approachB, 'utf-8')}\n\`\`\``;
}

console.log(`\n⚖️  AI COUNCIL COMPARISON\n`);
console.log("=".repeat(80));

const comparisonPrompt = `Compare these two approaches:

**Approach A:**
${approachA}

**Approach B:**
${approachB}

Analyze from your area of expertise. Provide:
1. Key differences
2. Strengths of each approach
3. Weaknesses/risks
4. Your recommendation
5. Score (1-10) for each approach from your perspective

Be specific and practical.`;

// Get reviews from all experts in parallel
const reviews = await Promise.all(
  Object.entries(MODELS).map(async ([key, config]) => {
    console.log(`⏳ Asking ${config.name} (${config.focus})...`);
    const review = await ask(config.model, comparisonPrompt);
    return { key, config, review };
  })
);

// Print reviews
console.log("\n" + "=".repeat(80));
for (const { config, review } of reviews) {
  console.log(`\n${'─'.repeat(80)}`);
  console.log(`🎯 ${config.name.toUpperCase()}`);
  console.log(`   Focus: ${config.focus}`);
  console.log(`${'─'.repeat(80)}\n`);
  console.log(review);
}

// Final synthesis
console.log("\n" + "=".repeat(80));
console.log("\n🏆 FINAL VERDICT (Meta-Analysis)\n");

const verdict = await ask(
  "anthropic/claude-sonnet-4.5",
  `Review these expert opinions comparing two approaches:

${reviews.map(({ config, review }) =>
  `**${config.name} (${config.focus}):**\n${review}\n`
).join('\n---\n\n')}

Synthesize all perspectives into:
1. Overall winner and why
2. Use case recommendations (when to use each)
3. Risk summary for each approach
4. Action items if choosing each approach

Be decisive but fair.`
);

console.log(verdict);
console.log("\n" + "=".repeat(80));
console.log("\n✅ Comparison complete!\n");
