import { useState, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  project: string;
  services: string[];
}

interface FormErrors {
  name?: string;
  email?: string;
  project?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const services = [
  'Product Development',
  'AI Integration',
  'Cloud & DevOps',
  'Mobile Apps',
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    project: '',
    services: [],
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validateProject = (project: string): string | undefined => {
    if (!project.trim()) return 'Please tell us about your project';
    if (project.trim().length < 20) return 'Please provide more details (at least 20 characters)';
    return undefined;
  };

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'project':
        return validateProject(value);
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      project: validateProject(formData.project),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate on change if field has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field] as string);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, project: true });
    
    if (!validateForm()) {
      return;
    }
    
    setStatus('submitting');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, this would be an actual API call
      console.log('Form submitted:', formData);
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        project: '',
        services: [],
      });
      setTouched({});
      setErrors({});
    } catch (error) {
      setStatus('error');
    }
  };

  const inputClasses = (field: keyof FormErrors) => `
    w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-white/40
    focus:outline-none transition-all duration-200
    ${errors[field] && touched[field as string]
      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
      : 'border-white/10 focus:border-cyber-lime focus:ring-2 focus:ring-cyber-lime/20'
    }
  `;

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-8 text-center border border-glass-border"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cyber-lime/20 border border-cyber-lime/40 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-cyber-lime"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">
          Message Sent!
        </h3>
        <p className="text-white/70 mb-6">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-2 text-sm font-medium text-cyber-lime border border-cyber-lime/30 rounded-lg hover:bg-cyber-lime/10 transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
      aria-label="Contact form"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-2"
          >
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={inputClasses('name')}
            placeholder="John Doe"
            aria-required="true"
            aria-invalid={!!(errors.name && touched.name)}
            aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
          />
          <AnimatePresence>
            {errors.name && touched.name && (
              <motion.p
                id="name-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-400 flex items-center gap-1"
                role="alert"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={inputClasses('email')}
            placeholder="john@company.com"
            aria-required="true"
            aria-invalid={!!(errors.email && touched.email)}
            aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
          />
          <AnimatePresence>
            {errors.email && touched.email && (
              <motion.p
                id="email-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-red-400 flex items-center gap-1"
                role="alert"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Company Field */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-white mb-2"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyber-lime focus:ring-2 focus:ring-cyber-lime/20 transition-all duration-200"
          placeholder="Acme Inc."
        />
      </div>

      {/* Budget Field */}
      <div>
        <label
          htmlFor="budget"
          className="block text-sm font-medium text-white mb-2"
        >
          Budget Range
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={(e) => handleChange('budget', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyber-lime focus:ring-2 focus:ring-cyber-lime/20 transition-all duration-200"
        >
          <option value="" className="bg-obsidian">Select a range</option>
          <option value="50-100k" className="bg-obsidian">$50,000 - $100,000</option>
          <option value="100-250k" className="bg-obsidian">$100,000 - $250,000</option>
          <option value="250-500k" className="bg-obsidian">$250,000 - $500,000</option>
          <option value="500k+" className="bg-obsidian">$500,000+</option>
        </select>
      </div>

      {/* Project Description */}
      <div>
        <label
          htmlFor="project"
          className="block text-sm font-medium text-white mb-2"
        >
          Tell us about your project <span className="text-red-400">*</span>
        </label>
        <textarea
          id="project"
          name="project"
          rows={5}
          value={formData.project}
          onChange={(e) => handleChange('project', e.target.value)}
          onBlur={() => handleBlur('project')}
          className={`${inputClasses('project')} resize-none`}
          placeholder="Describe your project, goals, and timeline..."
          aria-required="true"
          aria-invalid={!!(errors.project && touched.project)}
          aria-describedby={errors.project && touched.project ? 'project-error' : undefined}
        />
        <div className="flex justify-between items-center mt-2">
          <AnimatePresence>
            {errors.project && touched.project && (
              <motion.p
                id="project-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-red-400 flex items-center gap-1"
                role="alert"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errors.project}
              </motion.p>
            )}
          </AnimatePresence>
          <span className={`text-xs ${formData.project.length < 20 ? 'text-white/40' : 'text-cyber-lime'}`}>
            {formData.project.length}/20 min
          </span>
        </div>
      </div>

      {/* Services */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Services you're interested in
        </label>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => handleServiceToggle(service)}
              className={`
                flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left
                ${formData.services.includes(service)
                  ? 'border-cyber-lime bg-cyber-lime/10 text-cyber-lime'
                  : 'border-white/10 hover:border-white/20 text-white/80'
                }
              `}
              aria-pressed={formData.services.includes(service)}
            >
              <span
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                  ${formData.services.includes(service)
                    ? 'border-cyber-lime bg-cyber-lime'
                    : 'border-white/30'
                  }
                `}
              >
                {formData.services.includes(service) && (
                  <svg className="w-3 h-3 text-obsidian" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="text-sm">{service}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2"
            role="alert"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Something went wrong. Please try again.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`
          w-full btn-brutal text-lg relative overflow-hidden
          ${status === 'submitting' ? 'opacity-80 cursor-not-allowed' : ''}
        `}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-center text-sm text-white/60">
        We typically respond within 24 hours.
      </p>
    </form>
  );
}
