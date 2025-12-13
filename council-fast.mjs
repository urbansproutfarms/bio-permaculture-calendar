import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const MODELS = {
  deepseek: "deepseek/deepseek-chat",
  gemini_flash: "google/gemini-2.0-flash",
  openai_mini: "openai/gpt-4.1-mini",
  mistral_large: "mistralai/mistral-large",
  qwen_coder: "qwen/qwen-2.5-coder-32b-instruct",
  llama_70b: "meta-llama/llama-3.1-70b-instruct",
  command_r_plus: "cohere/command-r-plus",
  grok: "x-ai/grok-2",
  sonar: "perplexity/sonar",
};

async function ask(name, model, prompt, timeout = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await client.chat.completions.create(
      {
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      },
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);
    return {
      name,
      model,
      response: res.choices[0]?.message?.content ?? "(no response)",
      success: true,
      duration: 0, // OpenRouter doesn't expose duration
    };
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      name,
      model,
      error: error.message,
      success: false,
    };
  }
}

const prompt = process.argv.slice(2).join(" ");
if (!prompt) {
  console.error(`
Usage: node council-fast.mjs "your question"

Fast parallel execution - all 9 models queried simultaneously.

Example:
  node council-fast.mjs "What's the best way to handle forms in React?"

Models queried:
  ${Object.entries(MODELS)
    .map(([name, model]) => `• ${name}: ${model}`)
    .join("\n  ")}
  `);
  process.exit(1);
}

console.log(`\n⚡ FAST PARALLEL COUNCIL\n`);
console.log(`📝 Question: ${prompt}\n`);
console.log(`🚀 Querying ${Object.keys(MODELS).length} models in parallel...\n`);
console.log("=".repeat(80));

const startTime = Date.now();

// Execute all queries in parallel
const results = await Promise.all(
  Object.entries(MODELS).map(([name, model]) => ask(name, model, prompt))
);

const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

// Sort by success first, then alphabetically
results.sort((a, b) => {
  if (a.success !== b.success) return b.success - a.success;
  return a.name.localeCompare(b.name);
});

// Print results
for (const result of results) {
  console.log(`\n${"─".repeat(80)}`);

  if (result.success) {
    console.log(`✅ ${result.name.toUpperCase()}`);
    console.log(`   ${result.model}`);
    console.log(`${"─".repeat(80)}\n`);
    console.log(result.response);
  } else {
    console.log(`❌ ${result.name.toUpperCase()} - FAILED`);
    console.log(`   ${result.model}`);
    console.log(`${"─".repeat(80)}\n`);
    console.log(`Error: ${result.error}`);
  }
}

// Summary
const successful = results.filter((r) => r.success).length;
const failed = results.filter((r) => !r.success).length;

console.log(`\n${"=".repeat(80)}`);
console.log(`\n📊 Summary:`);
console.log(`   ✅ Successful: ${successful}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   ⏱️  Total time: ${totalTime}s`);
console.log(`   ⚡ Average per model: ${(totalTime / results.length).toFixed(2)}s (in parallel)\n`);
