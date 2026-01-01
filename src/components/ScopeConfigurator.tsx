import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface ConfigOptions {
  teamSize: number;
  timeline: number;
  platforms: {
    web: boolean;
    mobile: boolean;
    desktop: boolean;
  };
  features: {
    ai: boolean;
    blockchain: boolean;
    realtime: boolean;
    analytics: boolean;
  };
}

// Pricing multipliers
const BASE_RATE = 15000; // Monthly base rate per developer
const PLATFORM_COSTS = {
  web: 1.0,
  mobile: 1.4,
  desktop: 1.2,
};
const FEATURE_COSTS = {
  ai: 25000,
  blockchain: 40000,
  realtime: 15000,
  analytics: 10000,
};

export default function ScopeConfigurator() {
  const [config, setConfig] = useState<ConfigOptions>({
    teamSize: 3,
    timeline: 3,
    platforms: {
      web: true,
      mobile: false,
      desktop: false,
    },
    features: {
      ai: false,
      blockchain: false,
      realtime: false,
      analytics: true,
    },
  });

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Calculate estimate
  const estimate = useMemo(() => {
    // Base team cost
    let baseCost = config.teamSize * BASE_RATE * config.timeline;

    // Platform multiplier (average if multiple)
    const activePlatforms = Object.entries(config.platforms).filter(
      ([, v]) => v
    );
    if (activePlatforms.length > 0) {
      const avgMultiplier =
        activePlatforms.reduce(
          (sum, [key]) =>
            sum + PLATFORM_COSTS[key as keyof typeof PLATFORM_COSTS],
          0
        ) / activePlatforms.length;
      baseCost *= avgMultiplier;
    }

    // Feature costs
    const featureCost = Object.entries(config.features)
      .filter(([, v]) => v)
      .reduce(
        (sum, [key]) => sum + FEATURE_COSTS[key as keyof typeof FEATURE_COSTS],
        0
      );

    const total = baseCost + featureCost;

    // Return range (±20%)
    return {
      low: Math.round(total * 0.8),
      high: Math.round(total * 1.2),
    };
  }, [config]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In production, this would submit to an API
      console.log("Submitted:", { email, config, estimate });
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8 rounded-2xl border border-glass-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="space-y-8">
            {/* Team Size Slider */}
            <div>
              <label
                htmlFor="team-size-slider"
                className="block text-sm font-medium text-white mb-3"
              >
                Team Size
                <span className="ml-2 text-cyber-lime font-mono">
                  {config.teamSize} developers
                </span>
              </label>
              <input
                type="range"
                id="team-size-slider"
                min={1}
                max={10}
                value={config.teamSize}
                onChange={(e) =>
                  setConfig({ ...config, teamSize: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyber-lime"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            {/* Timeline Slider */}
            <div>
              <label
                htmlFor="timeline-slider"
                className="block text-sm font-medium text-white mb-3"
              >
                Timeline
                <span className="ml-2 text-electric-indigo font-mono">
                  {config.timeline} months
                </span>
              </label>
              <input
                type="range"
                id="timeline-slider"
                min={1}
                max={12}
                value={config.timeline}
                onChange={(e) =>
                  setConfig({ ...config, timeline: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-electric-indigo"
              />
              <div className="flex justify-between text-xs text-white/40 mt-1">
                <span>1 mo</span>
                <span>12 mo</span>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Platforms
              </label>
              <div className="flex flex-wrap gap-3">
                {Object.entries(config.platforms).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() =>
                      setConfig({
                        ...config,
                        platforms: { ...config.platforms, [key]: !value },
                      })
                    }
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all border ${
                      value
                        ? "bg-cyber-lime/20 border-cyber-lime text-cyber-lime"
                        : "border-white/20 text-white/50 hover:border-white/40"
                    }`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Advanced Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(config.features).map(([key, value]) => {
                  const labels: Record<string, string> = {
                    ai: "AI/ML Integration",
                    blockchain: "Blockchain",
                    realtime: "Real-time",
                    analytics: "Analytics",
                  };
                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setConfig({
                          ...config,
                          features: { ...config.features, [key]: !value },
                        })
                      }
                      className={`px-4 py-3 rounded-lg text-sm transition-all border text-left ${
                        value
                          ? "bg-electric-purple/20 border-electric-purple text-white"
                          : "border-white/20 text-white/50 hover:border-white/40"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            value
                              ? "bg-electric-purple border-electric-purple"
                              : "border-white/30"
                          }`}
                        >
                          {value && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </span>
                        {labels[key]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estimate Display */}
          <div className="flex flex-col">
            <div className="flex-1 p-6 rounded-xl bg-white/5 border border-white/10">
              <span className="text-sm font-mono uppercase tracking-wider text-white/40">
                Estimated Investment
              </span>

              <motion.div
                key={`${estimate.low}-${estimate.high}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="text-4xl font-bold font-mono text-cyber-lime">
                  {formatCurrency(estimate.low)}
                  <span className="text-white/40 mx-2">—</span>
                  {formatCurrency(estimate.high)}
                </div>
              </motion.div>

              <p className="mt-4 text-sm text-white/50">
                This is a preliminary estimate based on your configuration.
                Final pricing depends on detailed requirements.
              </p>

              {/* Summary */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Team</span>
                  <span className="font-mono">
                    {config.teamSize} developers
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Duration</span>
                  <span className="font-mono">{config.timeline} months</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Platforms</span>
                  <span className="font-mono">
                    {Object.entries(config.platforms)
                      .filter(([, v]) => v)
                      .map(([k]) => k)
                      .join(", ") || "None selected"}
                  </span>
                </div>
              </div>
            </div>

            {/* Email Capture */}
            <div className="mt-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for detailed breakdown"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-cyber-lime transition-colors"
                  />
                  <button type="submit" className="w-full btn-brutal">
                    Get Detailed Estimate
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-lg bg-cyber-lime/10 border border-cyber-lime/30 text-center"
                >
                  <span className="text-cyber-lime font-medium">
                    ✓ We'll send your detailed estimate shortly!
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
