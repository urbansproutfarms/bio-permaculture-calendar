# AI Council Scripts - Multi-Model Decision Making

A collection of scripts that query multiple AI models via OpenRouter to get diverse perspectives on technical decisions, debugging, and code reviews.

**Your 9-Member Council:**
- DeepSeek Chat (fast reasoning)
- Gemini 2.0 Flash (quick insights)
- GPT-4.1 Mini (balanced)
- Mistral Large (multilingual, large context)
- Qwen Coder 32B (code specialist)
- Llama 3.1 70B (strong reasoning)
- Command R+ (RAG, structured output)
- Grok 2 (real-time data)
- Perplexity Sonar (web search)

## 🎭 Available Council Variants

### 1. **council.mjs** - Full 9-Model Council
Queries all 9 models sequentially with detailed output.

```bash
node council.mjs "How do I fix this Next.js routing error?"
```

**All 9 Models:**
- DeepSeek Chat (fast reasoning, debugging)
- Gemini 2.0 Flash (quick practical advice)
- GPT-4.1 Mini (balanced, reliable)
- Mistral Large (multilingual, large context)
- Qwen Coder 32B (code generation specialist)
- Llama 3.1 70B (strong reasoning, open source)
- Command R+ (RAG, citations, structured output)
- Grok 2 (real-time data, X integration)
- Perplexity Sonar (web search enhanced)

**Features:**
- Sequential execution with error handling
- Detailed specialty information for each model
- Success/failure tracking

---

### 2. **council-fast.mjs** - Parallel Execution (⚡ FASTEST)
Queries all 9 models **in parallel** for maximum speed.

```bash
node council-fast.mjs "What's the best way to handle forms in React?"
```

**Speed Advantage:**
- Sequential (council.mjs): ~90 seconds total (9 models × 10s each)
- Parallel (council-fast.mjs): ~10-15 seconds total (all at once!)

**Features:**
- Parallel Promise.all execution
- 30-second timeout per model
- Sorts results (successful first)
- Shows total time and average per model

**Use When:**
- You need answers FAST
- You want all perspectives quickly
- Time is more important than reading each response sequentially

---

### 3. **council-smart.mjs** - Auto-Select Best Models (💡 SMARTEST)
Automatically picks the 3-4 best models based on your question type.

```bash
# Auto-detects "debug" → uses deepseek, qwen, gemini
node council-smart.mjs "Debug: Cannot read property 'locale'"

# Auto-detects "decision" → uses llama, mistral, openai, cohere
node council-smart.mjs "Compare Redux vs Zustand"

# Override: query all 9 models
node council-smart.mjs --all "Should I migrate to App Router?"
```

**Question Type Detection:**
- `debug` → Fast analytical models (deepseek, qwen_coder, gemini_flash)
- `code` → Code specialists (qwen_coder, deepseek, llama_70b)
- `decision` → Diverse reasoning (llama_70b, mistral_large, openai_mini, command_r_plus)
- `current` → Real-time data (sonar, grok, gemini_flash)
- `explanation` → Clear communicators (gemini_flash, mistral_large, openai_mini)
- `optimization` → Technical depth (qwen_coder, deepseek, llama_70b)
- `general` → Fast balanced (gemini_flash, deepseek, openai_mini)

**Features:**
- Automatic question type detection
- Optimized model selection (saves cost!)
- Parallel execution of selected models
- Cost estimation

**Use When:**
- You want optimal cost/quality
- You don't need all 9 opinions
- You want the right experts for your question

---

### 4. **council-enhanced.mjs** - Role-Specialized Council
Models with specialized roles and category-based prompting.

```bash
# Debug mode (focused, analytical)
node council-enhanced.mjs --debug "i18n routing not working"

# Design mode (trade-off analysis)
node council-enhanced.mjs --design "Should I use Zustand or Redux?"

# Code mode (working solutions)
node council-enhanced.mjs --code "How to implement infinite scroll?"

# General mode (default)
node council-enhanced.mjs "What's the best way to learn TypeScript?"
```

**Specialized Roles:**
- **DeepSeek R1**: Analytical debugger (root cause analysis)
- **Claude Sonnet 4.5**: Code architect (detailed implementations)
- **Gemini Flash 2.0**: Quick advisor (rapid practical suggestions)
- **GPT-4o**: Creative problem solver (alternative approaches)

**Features:**
- Parallel querying for speed
- Category-based system prompts
- Role-specific temperature settings
- Error handling per model

---

### 5. **council-vote.mjs** - Consensus Builder
Gets responses from all models, then synthesizes a consensus.

```bash
node council-vote.mjs "Should I migrate from Pages Router to App Router in Next.js?"
```

**Two-Phase Process:**
1. **Phase 1**: All models give individual responses
2. **Phase 2**: Claude synthesizes all responses into:
   - Consensus points
   - Key disagreements
   - Recommended approach
   - Reasoning

**Use Cases:**
- Architecture decisions
- Technology stack choices
- Approach validation
- Settling debates

---

### 6. **council-compare.mjs** - Expert Comparison
Compares two approaches from multiple expert perspectives.

```bash
# Compare files
node council-compare.mjs middleware-v1.ts middleware-v2.ts

# Compare approaches
node council-compare.mjs "Use Redux" "Use Zustand"

# Compare code snippets
node council-compare.mjs "const arr = []" "const arr = new Array()"
```

**Expert Perspectives:**
- **Claude Sonnet 4.5**: Architecture & design patterns
- **DeepSeek R1**: Performance & optimization
- **GPT-4o**: Security & edge cases
- **Gemini Flash 2.0**: Maintainability & DX

**Output:**
- Individual expert reviews
- Scores (1-10) from each perspective
- Final verdict with use case recommendations
- Risk summary for each approach
- Action items for implementation

---

## 🔧 Setup

### Prerequisites
```bash
npm install openai
```

### Environment Variable
```bash
export OPENROUTER_API_KEY="your-key-here"
```

Or create a `.env` file:
```env
OPENROUTER_API_KEY=sk-or-v1-...
```

---

## 🎯 Quick Start Guide

### Choose Your Council

| Script | When to Use | Speed | Cost |
|--------|-------------|-------|------|
| **council-smart.mjs** | Default choice (auto-picks 3-4 best models) | ⚡⚡⚡ | 💰 |
| **council-fast.mjs** | Need all 9 opinions FAST | ⚡⚡⚡ | 💰💰💰 |
| **council.mjs** | Want to read each response carefully | ⚡ | 💰💰💰 |
| **council-vote.mjs** | Big decision, need consensus | ⚡⚡ | 💰💰 |
| **council-compare.mjs** | Comparing two specific approaches | ⚡⚡ | 💰💰 |

### Recommended Workflow

1. **Quick question?** → `council-smart.mjs`
2. **Debug error?** → `council-smart.mjs` (auto-picks debug experts)
3. **Need all opinions?** → `council-fast.mjs`
4. **Big decision?** → `council-vote.mjs`
5. **Compare options?** → `council-compare.mjs`

---

## 📊 Model Selection Guide

### All 9 Models - Specializations

| Model | Best For | Strengths | Cost |
|-------|----------|-----------|------|
| **DeepSeek Chat** | Debugging, analysis | Fast reasoning, root cause | 💰 |
| **Qwen Coder 32B** | Code generation | Code specialist, optimization | 💰 |
| **Gemini 2.0 Flash** | Quick answers | Speed, practical advice | 💰 |
| **Llama 3.1 70B** | Reasoning | Strong logic, open source | 💰 |
| **GPT-4.1 Mini** | Balanced tasks | Reliable, general purpose | 💰💰 |
| **Mistral Large** | Multilingual | Large context, i18n | 💰💰 |
| **Command R+** | RAG, citations | Structured output, sources | 💰💰 |
| **Perplexity Sonar** | Current info | Web search, recent data | 💰💰 |
| **Grok 2** | Real-time | X integration, breaking news | 💰💰💰 |

### Cost Optimization

OpenRouter pricing (approximate per 1M tokens):
- DeepSeek R1: ~$0.10 (cheapest)
- Gemini Flash 2.0: ~$0.15
- GPT-4.1 Mini: ~$0.30
- Claude 3.5 Sonnet: ~$3.00
- GPT-4o: ~$5.00

**Tip**: Use DeepSeek for rapid iteration, Claude for final answers.

---

## 💡 Use Case Examples

### 1. Debugging a Production Error
```bash
node council-enhanced.mjs --debug "
Getting TypeError: Cannot read property 'locale' of undefined in middleware.ts
Context: Next.js 14, next-intl, trying to get locale from request
Stack trace: [paste trace]
"
```

### 2. Architecture Decision
```bash
node council-vote.mjs "
Should I use:
A) Server Components with RSC
B) Client Components with React Query
C) Hybrid approach

For a dashboard with real-time updates?
"
```

### 3. Code Review
```bash
node council-compare.mjs old-implementation.ts new-implementation.ts
```

### 4. Performance Optimization
```bash
node council-enhanced.mjs --code "
Optimize this function that runs on every render:
\`\`\`ts
const filtered = items.filter(i => i.active).map(i => i.name)
\`\`\`
"
```

---

## 🎯 Best Practices

### 1. **Provide Context**
Bad:
```bash
node council.mjs "Why error?"
```

Good:
```bash
node council-enhanced.mjs --debug "
Error: Cannot find module './[locale]'
File: src/middleware.ts:15
Next.js: 14.2.0
next-intl: 3.0.0
Trying to: Import locale-specific messages
"
```

### 2. **Use the Right Tool**
- **Quick question** → `council.mjs`
- **Debugging** → `council-enhanced.mjs --debug`
- **Big decision** → `council-vote.mjs`
- **Two options** → `council-compare.mjs`

### 3. **Iterate**
First pass:
```bash
node council.mjs "Best way to handle i18n in Next.js?"
```

Follow-up:
```bash
node council-compare.mjs "next-intl" "next-i18next"
```

Final decision:
```bash
node council-vote.mjs "Use next-intl with App Router?"
```

---

## 🔬 Advanced Usage

### Chain Councils
```bash
# Step 1: Get approaches
node council.mjs "Ways to implement auth in Next.js" > approaches.txt

# Step 2: Compare top 2
node council-compare.mjs "NextAuth.js" "Clerk"

# Step 3: Get consensus
node council-vote.mjs "Final decision: NextAuth vs Clerk for SaaS app?"
```

### Custom Model Selection
Edit any script to add/remove models:

```javascript
const MODELS = {
  fast: "deepseek/deepseek-r1",
  smart: "anthropic/claude-sonnet-4.5",
  // Add your favorites
};
```

### Parallel Processing
All enhanced scripts run queries in parallel for speed:
```javascript
const responses = await Promise.all(
  models.map(model => ask(model, prompt))
);
```

---

## 📈 Performance Tips

### 1. Cache Results
```bash
node council.mjs "question" | tee cache/question-$(date +%s).txt
```

### 2. Timeout Handling
Add to any script:
```javascript
const timeout = (ms) => new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Timeout')), ms)
);

const response = await Promise.race([
  ask(model, prompt),
  timeout(30000) // 30s timeout
]);
```

### 3. Cost Tracking
```bash
# Count tokens (rough estimate)
echo "Your prompt" | wc -w  # Words
# Multiply by ~1.3 for tokens
# Check OpenRouter dashboard for actual usage
```

---

## 🛠️ Troubleshooting

### "API key not found"
```bash
# Check environment
echo $OPENROUTER_API_KEY

# Or set it
export OPENROUTER_API_KEY="sk-or-v1-..."
```

### "Model not available"
Some models may be down. Check OpenRouter status:
```bash
curl https://openrouter.ai/api/v1/models
```

### "Rate limit exceeded"
```bash
# Add delay between requests
await new Promise(r => setTimeout(r, 1000)); // 1s delay
```

---

## 📝 Output Format

All scripts output markdown-friendly text. Pipe to a file:

```bash
node council-vote.mjs "question" > decision-$(date +%Y%m%d).md
```

Add to git:
```bash
mkdir -p docs/decisions
node council-vote.mjs "architecture decision" > docs/decisions/ADR-001-i18n.md
git add docs/decisions/ADR-001-i18n.md
git commit -m "docs: Add i18n architecture decision record"
```

---

## 🎓 Learning Resources

### Understanding the Models
- **DeepSeek R1**: Chain-of-thought reasoning model
- **Claude**: Best for code, long context (200k tokens)
- **Gemini**: Fast, good for quick iterations
- **GPT-4**: Creative, good for exploration

### OpenRouter Docs
- [Model comparison](https://openrouter.ai/models)
- [Pricing](https://openrouter.ai/docs#models)
- [API reference](https://openrouter.ai/docs)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install openai

# 2. Set API key
export OPENROUTER_API_KEY="your-key"

# 3. Quick question (auto-picks best 3-4 models)
node council-smart.mjs "Should I use TypeScript or JavaScript?"

# 4. Fast (all 9 models in parallel)
node council-fast.mjs "How to debounce input in React?"

# 5. Full council (sequential, detailed)
node council.mjs "Explain React Server Components"

# 6. Make a decision (with consensus)
node council-vote.mjs "Which CSS framework: Tailwind vs CSS Modules?"

# 7. Compare implementations
node council-compare.mjs "approach-a.ts" "approach-b.ts"
```

---

## 📈 Performance Comparison

Asking "Should I use Redux or Zustand?" to all 9 models:

| Method | Time | Cost | Best For |
|--------|------|------|----------|
| council.mjs (sequential) | ~90s | $$$  | Reading carefully |
| council-fast.mjs (parallel) | ~12s | $$$  | Need all opinions fast |
| council-smart.mjs (auto-3) | ~8s  | $    | Most efficient |
| council-vote.mjs | ~25s | $$   | Consensus needed |

---

## 📜 License
MIT - Use however you want!

## 🤝 Contributing
These are simple scripts - fork and customize for your needs!

---

**Pro Tip**: Combine with your IDE. In VS Code:
```json
{
  "tasks": [
    {
      "label": "Ask AI Council",
      "type": "shell",
      "command": "node council.mjs \"${input:question}\""
    }
  ]
}
```
