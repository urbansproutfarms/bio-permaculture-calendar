import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// 9-member AI Council - Diverse perspectives
const MODELS = {
  // Fast reasoning & analysis
  deepseek: {
    model: "deepseek/deepseek-chat",
    specialty: "Fast reasoning, debugging",
    cost: "💰 (cheap)",
  },

  // Quick general intelligence
  gemini_flash: {
    model: "google/gemini-2.0-flash",
    specialty: "Quick insights, practical advice",
    cost: "💰 (cheap)",
  },

  // Balanced OpenAI
  openai_mini: {
    model: "openai/gpt-4.1-mini",
    specialty: "Balanced, reliable",
    cost: "💰💰 (moderate)",
  },

  // Large context, multilingual
  mistral_large: {
    model: "mistralai/mistral-large",
    specialty: "Multilingual, large context",
    cost: "💰💰 (moderate)",
  },

  // Code specialist
  qwen_coder: {
    model: "qwen/qwen-2.5-coder-32b-instruct",
    specialty: "Code generation, optimization",
    cost: "💰 (cheap)",
  },

  // Large model reasoning
  llama_70b: {
    model: "meta-llama/llama-3.1-70b-instruct",
    specialty: "Strong reasoning, open source",
    cost: "💰 (cheap)",
  },

  // RAG and retrieval
  command_r_plus: {
    model: "cohere/command-r-plus",
    specialty: "RAG, citations, structured output",
    cost: "💰💰 (moderate)",
  },

  // Real-time knowledge
  grok: {
    model: "x-ai/grok-2",
    specialty: "Real-time data, X integration",
    cost: "💰💰💰 (expensive)",
  },

  // Web search enhanced
  sonar: {
    model: "perplexity/sonar",
    specialty: "Web search, current information",
    cost: "💰💰 (moderate)",
  },
};

async function ask(model, prompt, specialty) {
  const res = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });
  return res.choices[0]?.message?.content ?? "(no content returned)";
}

const prompt = process.argv.slice(2).join(" ");
if (!prompt) {
  console.error(`
Usage: node council.mjs "paste error + context"

Your 9-member AI Council:
${Object.entries(MODELS)
  .map(([name, { specialty, cost }]) => `  ${name.padEnd(15)} : ${specialty.padEnd(40)} ${cost}`)
  .join("\n")}

Example:
  node council.mjs "Should I use next-intl or next-i18next for Next.js 14?"
  node council.mjs "Debug: TypeError in middleware.ts line 42"
  `);
  process.exit(1);
}

console.log(`\n🏛️  AI COUNCIL - 9 Members\n`);
console.log(`📝 Question: ${prompt}\n`);
console.log("=".repeat(80));

// Track successes and failures
const results = { success: 0, failed: 0 };

for (const [name, { model, specialty, cost }] of Object.entries(MODELS)) {
  try {
    console.log(`\n${"─".repeat(80)}`);
    console.log(`🤖 ${name.toUpperCase()} (${specialty})`);
    console.log(`   Model: ${model} ${cost}`);
    console.log(`${"─".repeat(80)}\n`);

    const response = await ask(model, prompt, specialty);
    console.log(response);
    results.success++;
  } catch (e) {
    console.log(`\n${"─".repeat(80)}`);
    console.log(`❌ ${name.toUpperCase()} - ERROR`);
    console.log(`${"─".repeat(80)}\n`);
    console.log(String(e?.message || e));
    results.failed++;
  }
}

console.log(`\n${"=".repeat(80)}`);
console.log(`\n✅ Council Complete: ${results.success} responded, ${results.failed} failed\n`);
