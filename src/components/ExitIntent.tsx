import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExitIntentProps {
  delay?: number; // Delay before exit intent is active (ms)
}

export default function ExitIntent({ delay = 5000 }: ExitIntentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);

  const STORAGE_KEY = 'apex-exit-intent-shown';
  const STORAGE_SUBSCRIBED_KEY = 'apex-newsletter-subscribed';

  // Check if popup should be shown
  useEffect(() => {
    // Don't show if already subscribed or shown recently
    const hasSubscribed = localStorage.getItem(STORAGE_SUBSCRIBED_KEY);
    const lastShown = localStorage.getItem(STORAGE_KEY);
    
    if (hasSubscribed) return;
    
    // Don't show if shown in the last 3 days
    if (lastShown) {
      const lastShownDate = new Date(parseInt(lastShown));
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      if (lastShownDate > threeDaysAgo) return;
    }

    // Set ready after delay
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Handle mouse leave detection
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if mouse leaves through the top of the viewport
    if (e.clientY <= 0 && isReady && !isVisible) {
      setIsVisible(true);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  }, [isReady, isVisible]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    localStorage.setItem(STORAGE_SUBSCRIBED_KEY, 'true');

    // Close popup after success message
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-8"
          >
            <div className="glass-card border border-glass-border rounded-2xl p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, #00FF9D, transparent)' }}
              />
              <div 
                className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #6366F1, transparent)' }}
              />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
                aria-label="Close popup"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-cyber-lime/10 border border-cyber-lime/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-cyber-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-display font-bold text-white mb-3">
                        Wait! Don't leave yet
                      </h3>
                      <p className="text-white/60">
                        Get exclusive insights on tech trends, case studies, and startup growth tips delivered to your inbox.
                      </p>
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-2 mb-6">
                      {[
                        'Weekly curated tech insights',
                        'Early access to case studies',
                        'Founder tips & resources'
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-white/70">
                          <svg className="w-4 h-4 text-cyber-lime shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                          }}
                          placeholder="Enter your email"
                          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-cyber-lime/50 transition-all ${
                            error ? 'border-red-500/50' : 'border-white/10'
                          }`}
                          aria-label="Email address"
                          aria-invalid={!!error}
                        />
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-sm text-red-400"
                          >
                            {error}
                          </motion.p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 bg-cyber-lime text-obsidian font-semibold rounded-lg hover:bg-cyber-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Subscribing...
                          </>
                        ) : (
                          <>
                            Subscribe Now
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-center text-xs text-white/40 mt-4">
                      No spam. Unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cyber-lime/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-cyber-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                      You're in! 🎉
                    </h3>
                    <p className="text-white/60">
                      Check your inbox for a welcome email.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
