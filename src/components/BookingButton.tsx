import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function BookingModal({ isOpen, onClose }: BookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <div className="bg-carbon border border-glass-border rounded-2xl overflow-hidden shadow-2xl h-full sm:h-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-glass-border">
                <div>
                  <h2 id="booking-modal-title" className="text-xl font-display font-bold text-white">
                    Schedule a Call
                  </h2>
                  <p className="text-sm text-white/60 mt-1">
                    Book a 30-minute intro call with our team
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Time slot selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white mb-3">
                    Select a time slot
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { day: "Tomorrow", slots: ["10:00 AM", "2:00 PM"] },
                      { day: "Thu, Jan 2", slots: ["11:00 AM", "3:00 PM"] },
                    ].map((group) => (
                      <div key={group.day}>
                        <p className="text-xs text-white/50 mb-2">{group.day}</p>
                        <div className="space-y-2">
                          {group.slots.map((slot) => (
                            <button
                              key={slot}
                              className="w-full px-3 py-2 rounded-lg border border-white/10 text-sm text-white/80 hover:border-cyber-lime hover:text-cyber-lime transition-all"
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Or use external calendar */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-glass-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-carbon text-sm text-white/40">or</span>
                  </div>
                </div>

                {/* External booking links */}
                <div className="mt-6 space-y-3">
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-cyber-lime/50 hover:bg-cyber-lime/5 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                    </svg>
                    <span>Open Calendly</span>
                    <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>

                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-electric-indigo/50 hover:bg-electric-indigo/5 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>Open Cal.com</span>
                    <svg className="w-4 h-4 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>

                {/* Email alternative */}
                <p className="mt-6 text-center text-sm text-white/50">
                  Prefer email?{' '}
                  <a href="mailto:hello@apexlabs.dev" className="text-cyber-lime hover:underline">
                    hello@apexlabs.dev
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function BookingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-electric-indigo/20 border border-electric-indigo/30 text-electric-indigo hover:bg-electric-indigo hover:text-white transition-all duration-300"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="font-medium">Book a Call</span>
      </button>

      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
