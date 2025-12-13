import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// All available models with metadata
const ALL_MODELS = {
  deepseek: {
    model: "deepseek/deepseek-chat",
    tags: ["debug", "analysis", "fast", "cheap"],
    strength: "Fast analytical reasoning",
  },
  gemini_flash: {
    model: "google/gemini-2.0-flash",
    tags: ["quick", "general", "fast", "cheap"],
    strength: "Quick practical insights",
  },
  openai_mini: {
    model: "openai/gpt-4.1-mini",
    tags: ["general", "balanced", "reliable"],
    strength: "Balanced performance",
  },
  mistral_large: {
    model: "mistralai/mistral-large",
    tags: ["multilingual", "context", "analysis"],
    strength: "Large context window",
  },
  qwen_coder: {
    model: "qwen/qwen-2.5-coder-32b-instruct",
    tags: ["code", "optimization", "debug", "cheap"],
    strength: "Code generation specialist",
  },
  llama_70b: {
    model: "meta-llama/llama-3.1-70b-instruct",
    tags: ["reasoning", "general", "cheap"],
    strength: "Strong reasoning",
  },
  command_r_plus: {
    model: "cohere/command-r-plus",
    tags: ["rag", "structured", "citations"],
    strength: "RAG and structured output",
  },
  grok: {
    model: "x-ai/grok-2",
    tags: ["realtime", "current", "expensive"],
    strength: "Real-time information",
  },
  sonar: {
    model: "perplexity/sonar",
    tags: ["search", "current", "web"],
    strength: "Web search integration",
  },
};

// Question type detection
function detectQuestionType(question) {
  const lower = question.toLowerCase();

  if (lower.match(/debug|error|fix|broken|not working|issue/i)) {
    return {
      type: "debug",
      models: ["deepseek", "qwen_coder", "gemini_flash"],
      reason: "Debugging requires fast analytical reasoning and code expertise",
    };
  }

  if (lower.match(/code|implement|function|how to write|example/i)) {
    return {
      type: "code",
      models: ["qwen_coder", "deepseek", "llama_70b"],
      reason: "Code generation benefits from specialized code models",
    };
  }

  if (lower.match(/compare|versus|vs|which|better|choose/i)) {
    return {
      type: "decision",
      models: ["llama_70b", "mistral_large", "openai_mini", "command_r_plus"],
      reason: "Decisions need diverse reasoning perspectives",
    };
  }

  if (lower.match(/current|latest|recent|news|2024|2025/i)) {
    return {
      type: "current",
      models: ["sonar", "grok", "gemini_flash"],
      reason: "Current info requires web search and real-time data",
    };
  }

  if (lower.match(/explain|what is|how does|why|understand/i)) {
    return {
      type: "explanation",
      models: ["gemini_flash", "mistral_large", "openai_mini"],
      reason: "Explanations need clear, accessible language",
    };
  }

  if (lower.match(/optimize|performance|faster|slow/i)) {
    return {
      type: "optimization",
      models: ["qwen_coder", "deepseek", "llama_70b"],
      reason: "Optimization needs technical depth and analysis",
    };
  }

  // Default: quick general council
  return {
    type: "general",
    models: ["gemini_flash", "deepseek", "openai_mini"],
    reason: "General questions use fast, balanced models",
  };
}

async function ask(modelKey, prompt) {
  const { model, strength } = ALL_MODELS[modelKey];
  const res = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });
  return {
    modelKey,
    strength,
    response: res.choices[0]?.message?.content ?? "(no response)",
  };
}

// Parse arguments
const args = process.argv.slice(2);
let useAllModels = false;
let prompt = args.join(" ");

if (args[0] === "--all") {
  useAllModels = true;
  prompt = args.slice(1).join(" ");
}

if (!prompt) {
  console.log(`
Usage:
  node council-smart.mjs "your question"        (auto-selects best 3-4 models)
  node council-smart.mjs --all "your question"  (asks all 9 models)

Examples:
  node council-smart.mjs "Debug: Cannot read property 'locale'"
    → Auto-selects: deepseek, qwen_coder, gemini_flash

  node council-smart.mjs "Compare Redux vs Zustand"
    → Auto-selects: llama_70b, mistral_large, openai_mini, command_r_plus

  node council-smart.mjs --all "Should I migrate to App Router?"
    → Asks all 9 models

Question Types Detected:
  • debug       → Fast analytical models (deepseek, qwen, gemini)
  • code        → Code specialists (qwen, deepseek, llama)
  • decision    → Diverse reasoning (llama, mistral, openai, cohere)
  • current     → Real-time data (sonar, grok, gemini)
  • explanation → Clear communicators (gemini, mistral, openai)
  • optimization → Technical depth (qwen, deepseek, llama)
  • general     → Fast balanced (gemini, deepseek, openai)
  `);
  process.exit(1);
}

// Detect question type and select models
const { type, models, reason } = detectQuestionType(prompt);
const selectedModels = useAllModels ? Object.keys(ALL_MODELS) : models;

console.log(`\n🧠 SMART AI COUNCIL\n`);
console.log(`📝 Question: ${prompt}\n`);
console.log(`🎯 Detected Type: ${type.toUpperCase()}`);
console.log(`💡 Strategy: ${reason}\n`);
console.log(
  `👥 Selected Models: ${selectedModels.length}/${Object.keys(ALL_MODELS).length} (${selectedModels.join(", ")})\n`
);
console.log("=".repeat(80));

// Query selected models in parallel
const responses = await Promise.all(
  selectedModels.map(async (modelKey) => {
    try {
      const result = await ask(modelKey, prompt);
      return { ...result, success: true };
    } catch (error) {
      return {
        modelKey,
        error: error.message,
        success: false,
      };
    }
  })
);

// Print results
for (const result of responses) {
  console.log(`\n${"─".repeat(80)}`);

  if (result.success) {
    console.log(`🤖 ${result.modelKey.toUpperCase()}`);
    console.log(`   Strength: ${result.strength}`);
    console.log(`   Model: ${ALL_MODELS[result.modelKey].model}`);
    console.log(`${"─".repeat(80)}\n`);
    console.log(result.response);
  } else {
    console.log(`❌ ${result.modelKey.toUpperCase()} - ERROR`);
    console.log(`${"─".repeat(80)}\n`);
    console.log(result.error);
  }
}

const successful = responses.filter((r) => r.success).length;
console.log(`\n${"=".repeat(80)}`);
console.log(`\n✅ Complete: ${successful}/${responses.length} models responded\n`);

// Cost estimate (rough)
const estimatedTokens = prompt.split(" ").length * 1.3 * responses.length;
console.log(`📊 Estimated tokens used: ~${Math.round(estimatedTokens)}`);
console.log(`💰 Estimated cost: $${((estimatedTokens / 1000000) * 0.5).toFixed(4)} (rough)\n`);
