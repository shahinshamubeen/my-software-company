import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DemoType = "text" | "sentiment" | "code" | "summary";

interface Demo {
  id: DemoType;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const demos: Demo[] = [
  {
    id: "text",
    title: "Text Generation",
    description: "Generate creative content, marketing copy, or product descriptions",
    icon: "✨",
    color: "#00FF9D",
  },
  {
    id: "sentiment",
    title: "Sentiment Analysis",
    description: "Analyze customer feedback, reviews, or social media mentions",
    icon: "😊",
    color: "#6366F1",
  },
  {
    id: "code",
    title: "Code Assistant",
    description: "Generate, explain, or refactor code in any programming language",
    icon: "💻",
    color: "#BF00FF",
  },
  {
    id: "summary",
    title: "Smart Summarization",
    description: "Condense long documents, articles, or reports into key insights",
    icon: "📝",
    color: "#FF9900",
  },
];

const sampleInputs: Record<DemoType, string> = {
  text: "Write a compelling product description for an AI-powered fitness app that creates personalized workout plans.",
  sentiment: "I absolutely love this product! The quality exceeded my expectations and customer service was fantastic. Will definitely buy again!",
  code: "// Create a function that finds the longest palindromic substring in a given string",
  summary: "Artificial intelligence (AI) is transforming industries worldwide. In healthcare, AI systems are helping doctors diagnose diseases earlier and more accurately. Financial institutions use AI for fraud detection and algorithmic trading. Manufacturing plants employ AI-powered robots for quality control and predictive maintenance. The transportation sector is advancing towards autonomous vehicles. Meanwhile, AI is revolutionizing customer service through chatbots and virtual assistants that handle millions of queries daily.",
};

const sampleOutputs: Record<DemoType, string> = {
  text: `🏋️ **FitGenius AI** - Your Personal Training Revolution

Transform your fitness journey with the world's smartest workout companion. FitGenius AI analyzes your body type, goals, and schedule to craft workout plans that evolve with you.

✅ **Adaptive Training** - Plans that adjust in real-time based on your progress
✅ **Smart Recovery** - AI-optimized rest periods to maximize gains
✅ **Nutrition Sync** - Workout timing aligned with your meal schedule

*"It's like having a world-class personal trainer in your pocket."*

Start your 7-day free trial today. Your future self will thank you.`,
  sentiment: `📊 **Sentiment Analysis Results**

**Overall Sentiment:** 🟢 Very Positive (92% confidence)

**Key Insights:**
• Strong emotional language ("absolutely love", "fantastic")
• High satisfaction indicators ("exceeded expectations")
• Purchase intent signals ("will definitely buy again")

**Detected Emotions:**
- Joy: 85%
- Trust: 78%
- Anticipation: 45%

**Recommendation:** This review is ideal for featuring in marketing materials and testimonials.`,
  code: `\`\`\`typescript
function longestPalindrome(s: string): string {
  if (s.length < 2) return s;
  
  let start = 0;
  let maxLength = 1;
  
  function expandAroundCenter(left: number, right: number): void {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1;
      if (currentLength > maxLength) {
        start = left;
        maxLength = currentLength;
      }
      left--;
      right++;
    }
  }
  
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i);     // Odd length
    expandAroundCenter(i, i + 1); // Even length
  }
  
  return s.substring(start, start + maxLength);
}

// Time: O(n²) | Space: O(1)
\`\`\``,
  summary: `📋 **Executive Summary**

**Key Points:**
1. **Healthcare:** AI enabling earlier, more accurate disease diagnosis
2. **Finance:** Fraud detection and algorithmic trading applications  
3. **Manufacturing:** Quality control and predictive maintenance via AI robots
4. **Transportation:** Progress toward autonomous vehicle technology
5. **Customer Service:** AI chatbots handling millions of daily queries

**Industries Covered:** 5
**Transformation Level:** High
**Reading Time Saved:** ~80%`,
};

export default function AIPlayground() {
  const [activeDemo, setActiveDemo] = useState<DemoType>("text");
  const [input, setInput] = useState(sampleInputs.text);
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDemoChange = (demoId: DemoType) => {
    setActiveDemo(demoId);
    setInput(sampleInputs[demoId]);
    setOutput("");
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setOutput("");

    // Simulate AI processing with typing effect
    const fullOutput = sampleOutputs[activeDemo];
    const words = fullOutput.split(" ");
    
    for (let i = 0; i < words.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      setOutput((prev) => prev + (i === 0 ? "" : " ") + words[i]);
    }

    setIsProcessing(false);
  };

  const currentDemo = demos.find((d) => d.id === activeDemo)!;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon via-obsidian to-carbon" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-mono uppercase tracking-widest text-electric-purple border border-electric-purple/30 rounded-full">
            Try It Yourself
          </span>
          <h2 className="text-display-md font-display font-bold text-white mb-4">
            AI Playground
          </h2>
          <p className="max-w-2xl mx-auto text-white/60">
            Experience the power of AI firsthand. Select a demo below and see how 
            our AI solutions can transform your business processes.
          </p>
        </div>

        {/* Demo Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => handleDemoChange(demo.id)}
              className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                activeDemo === demo.id
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 hover:border-white/20 bg-white/5"
              }`}
              style={{
                boxShadow: activeDemo === demo.id ? `0 0 30px ${demo.color}20` : undefined,
              }}
            >
              <span className="text-2xl mb-2 block">{demo.icon}</span>
              <h3 className="font-semibold text-white text-sm mb-1">{demo.title}</h3>
              <p className="text-xs text-white/50 line-clamp-2">{demo.description}</p>
            </button>
          ))}
        </div>

        {/* Playground Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">Input</span>
              <span
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  background: `${currentDemo.color}20`,
                  color: currentDemo.color,
                }}
              >
                {currentDemo.title}
              </span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 p-4 bg-transparent text-white text-sm resize-none focus:outline-none placeholder-white/30"
              placeholder="Enter your text here..."
            />
            <div className="px-4 py-3 border-t border-white/10">
              <button
                onClick={handleProcess}
                disabled={isProcessing || !input.trim()}
                className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{
                  background: `linear-gradient(135deg, ${currentDemo.color}, ${currentDemo.color}80)`,
                  color: "#050505",
                }}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Run AI Demo
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-medium text-white/80">AI Output</span>
              {output && (
                <button
                  onClick={() => navigator.clipboard.writeText(output)}
                  className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </button>
              )}
            </div>
            <div className="h-64 p-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                {output ? (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-white/80 whitespace-pre-wrap"
                  >
                    {output}
                    {isProcessing && (
                      <span className="inline-block w-2 h-4 bg-cyber-lime ml-1 animate-pulse" />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-white/30"
                  >
                    <svg
                      className="w-12 h-12 mb-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-1 2.65V11a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3h-1v2a2 2 0 0 1-4 0v-2H9a3 3 0 0 1-3-3v-1a3 3 0 0 1 3-3V9.65A4 4 0 0 1 8 7V6a4 4 0 0 1 4-4z" />
                      <circle cx="9" cy="7" r="1" fill="currentColor" />
                      <circle cx="15" cy="7" r="1" fill="currentColor" />
                    </svg>
                    <p className="text-sm">Click "Run AI Demo" to see the magic</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="px-4 py-3 border-t border-white/10">
              <p className="text-xs text-white/40 text-center">
                💡 This is a demo with simulated responses. Contact us to integrate real AI into your products.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            Ready to add AI superpowers to your product?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-cyber-lime text-cyber-lime font-semibold rounded-lg hover:bg-cyber-lime/10 transition-colors group"
          >
            Let's Build Together
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
