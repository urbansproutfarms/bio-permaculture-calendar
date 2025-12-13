// council-enhanced.mjs - Multi-model AI council with role specialization
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Specialized model configurations for different tasks
const MODEL_CONFIGS = {
  // Fast reasoning (good for debugging)
  reasoning: {
    name: "DeepSeek R1",
    model: "deepseek/deepseek-r1",
    temperature: 0.1,
    role: "Analytical debugger - focuses on root cause analysis",
  },

  // Code generation (good for solutions)
  coding: {
    name: "Claude Sonnet 4.5",
    model: "anthropic/claude-sonnet-4.5",
    temperature: 0.2,
    role: "Code architect - provides detailed implementation solutions",
  },

  // Quick insights (good for overviews)
  quick: {
    name: "Gemini Flash 2.0",
    model: "google/gemini-2.0-flash",
    temperature: 0.3,
    role: "Quick advisor - gives rapid, practical suggestions",
  },

  // Creative solutions (good for alternatives)
  creative: {
    name: "GPT-4o",
    model: "openai/gpt-4o",
    temperature: 0.7,
    role: "Creative problem solver - suggests alternative approaches",
  },
};

async function ask(config, prompt, category = "general") {
  // Add context based on category
  let systemPrompt = "";

  if (category === "debug") {
    systemPrompt = "You are debugging an error. Focus on: 1) Root cause, 2) Fix, 3) Prevention. Be concise.";
  } else if (category === "design") {
    systemPrompt = "You are reviewing architecture. Focus on: 1) Trade-offs, 2) Best practices, 3) Alternatives.";
  } else if (category === "code") {
    systemPrompt = "You are writing code. Provide: 1) Working solution, 2) Explanation, 3) Edge cases to handle.";
  }

  const messages = systemPrompt
    ? [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    : [{ role: "user", content: prompt }];

  const res = await client.chat.completions.create({
    model: config.model,
    messages,
    temperature: config.temperature,
  });

  return res.choices[0].message.content;
}

// Parse command line arguments
const args = process.argv.slice(2);
let category = "general";
let prompt = args.join(" ");

// Check for category flag
if (args[0]?.startsWith("--")) {
  category = args[0].substring(2); // Remove --
  prompt = args.slice(1).join(" ");
}

if (!prompt) {
  console.log(`
Usage: node council-enhanced.mjs [--category] "your question"

Categories:
  --debug   : Debugging errors (focused, analytical responses)
  --design  : Architecture/design decisions (trade-off analysis)
  --code    : Code implementation (working solutions)
  (default) : General questions

Examples:
  node council-enhanced.mjs --debug "i18n routing not working in Next.js"
  node council-enhanced.mjs --design "Should I use Zustand or Redux?"
  node council-enhanced.mjs --code "How to implement infinite scroll in React?"
  node council-enhanced.mjs "What's the best way to learn TypeScript?"

Models in council:
${Object.entries(MODEL_CONFIGS).map(([key, config]) =>
  `  ${key.padEnd(12)} : ${config.name} - ${config.role}`
).join('\n')}
  `);
  process.exit(1);
}

console.log(`\n🏛️  AI COUNCIL - Category: ${category.toUpperCase()}\n`);
console.log(`📝 Question: ${prompt}\n`);
console.log("=".repeat(80));

// Query all models in parallel for speed
const responses = await Promise.all(
  Object.entries(MODEL_CONFIGS).map(async ([key, config]) => {
    try {
      const response = await ask(config, prompt, category);
      return { key, config, response, success: true };
    } catch (error) {
      return { key, config, error: error.message, success: false };
    }
  })
);

// Print responses
for (const { key, config, response, error, success } of responses) {
  console.log(`\n${'─'.repeat(80)}`);
  console.log(`🤖 ${config.name.toUpperCase()} (${key})`);
  console.log(`   Role: ${config.role}`);
  console.log(`   Model: ${config.model}`);
  console.log(`${'─'.repeat(80)}\n`);

  if (success) {
    console.log(response);
  } else {
    console.log(`❌ Error: ${error}`);
  }
}

console.log(`\n${'='.repeat(80)}`);
console.log(`\n✅ Council complete! Reviewed by ${responses.filter(r => r.success).length}/${responses.length} models.\n`);
