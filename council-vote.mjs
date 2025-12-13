// council-vote.mjs - AI council that votes on the best solution
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const MODELS = [
  { name: "DeepSeek R1", model: "deepseek/deepseek-r1" },
  { name: "Claude Sonnet 4.5", model: "anthropic/claude-sonnet-4.5" },
  { name: "Gemini Flash 2.0", model: "google/gemini-2.0-flash" },
  { name: "GPT-4o", model: "openai/gpt-4o" },
];

async function ask(model, prompt, temperature = 0.2) {
  const res = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature,
  });
  return res.choices[0].message.content;
}

const prompt = process.argv.slice(2).join(" ");
if (!prompt) {
  console.error('Usage: node council-vote.mjs "Should I use approach A or B?"');
  process.exit(1);
}

console.log(`\n🗳️  AI COUNCIL VOTE\n`);
console.log(`📝 Question: ${prompt}\n`);
console.log("=".repeat(80));

// Phase 1: Get responses from all models
console.log("\n📊 Phase 1: Gathering responses...\n");
const responses = [];

for (const { name, model } of MODELS) {
  console.log(`⏳ Asking ${name}...`);
  const response = await ask(model, prompt);
  responses.push({ name, model, response });
}

// Phase 2: Show all responses
console.log("\n" + "=".repeat(80));
console.log("\n💬 All Responses:\n");
for (const { name, response } of responses) {
  console.log(`\n${'─'.repeat(80)}`);
  console.log(`🤖 ${name}:`);
  console.log(`${'─'.repeat(80)}`);
  console.log(response);
}

// Phase 3: Meta-analysis - ask one model to synthesize
console.log("\n" + "=".repeat(80));
console.log("\n🧠 Phase 2: Meta-Analysis (Claude Synthesizing)...\n");

const synthesis = await ask(
  "anthropic/claude-sonnet-4.5",
  `You are reviewing responses from 4 AI models to this question:

"${prompt}"

Here are their responses:

${responses.map(({ name, response }, i) =>
  `**Model ${i + 1}: ${name}**\n${response}\n`
).join('\n---\n\n')}

Your task:
1. Identify common themes and consensus points
2. Highlight key disagreements or alternative viewpoints
3. Provide a balanced synthesis
4. Recommend the strongest approach with reasoning

Format your response as:
## Consensus
## Disagreements
## Recommended Approach
## Reasoning`,
  0.3
);

console.log(synthesis);

console.log("\n" + "=".repeat(80));
console.log("\n✅ Council vote complete!\n");
