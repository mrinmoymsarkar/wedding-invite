import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Calendar } from 'lucide-react';
import { useWeddingEvents } from '../data/events';
import { useLanguage } from '../contexts/LanguageContext';

interface RSVPForm {
  guestName: string;
  email: string;
  phone: string;
  eventId: string;
  attending: boolean;
  guestCount: number;
  dietaryRestrictions: string;
  message: string;
}

const RSVP: React.FC = () => {
  const { t } = useLanguage();
  const weddingEvents = useWeddingEvents();
  const [formData, setFormData] = useState<RSVPForm>({
    guestName: '',
    email: '',
    phone: '',
    eventId: '',
    attending: true,
    guestCount: 1,
    dietaryRestrictions: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<RSVPForm>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RSVPForm> = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.eventId) {
      newErrors.eventId = 'Please select an event';
    }

    if (formData.guestCount < 1) {
      newErrors.guestCount = 'Guest count must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof RSVPForm, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 bg-white dark:bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-green-50 dark:bg-green-900/20 rounded-2xl p-12"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {t('rsvp.success_title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-bengali mb-6">
              {t('rsvp.success_subtitle')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t('rsvp.success_message')}
            </p>
            
            {/* Wedding icon in success state */}
            <motion.div
              className="mt-8"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src="https://1fimd9lwq61lrowk.public.blob.vercel-storage.com/wediing-icon-MWGi3zHWRSwveW4CaK9EM7s57pDP54.png"
                alt="Wedding Icon"
                className="h-16 w-16 mx-auto opacity-70"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 bg-white dark:bg-dark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.img
              src="https://1fimd9lwq61lrowk.public.blob.vercel-storage.com/wediing-icon-MWGi3zHWRSwveW4CaK9EM7s57pDP54.png"
              alt="Wedding Icon"
              className="h-8 w-8"
              animate={{ 
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white">
              {t('rsvp.title')}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-bengali mb-6">
            {t('rsvp.title_local')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-bengali-deep-red to-bengali-gold mx-auto mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('rsvp.description')}
          </p>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-dark-700 rounded-2xl p-8 shadow-cultural"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('rsvp.full_name')} *
                </label>
                <input
                  type="text"
                  value={formData.guestName}
                  onChange={(e) => handleChange('guestName', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.guestName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-dark-600 focus:border-bengali-crimson dark:focus:border-bengali-gold'
                  } bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bengali-crimson/20 dark:focus:ring-bengali-gold/20 transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.guestName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.guestName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('rsvp.email')} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-dark-600 focus:border-bengali-crimson dark:focus:border-bengali-gold'
                  } bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bengali-crimson/20 dark:focus:ring-bengali-gold/20 transition-colors`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('rsvp.phone')} *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-dark-600 focus:border-bengali-crimson dark:focus:border-bengali-gold'
                  } bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bengali-crimson/20 dark:focus:ring-bengali-gold/20 transition-colors`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('rsvp.guest_count')} *
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guestCount}
                  onChange={(e) => handleChange('guestCount', parseInt(e.target.value) || 1)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.guestCount 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-dark-600 focus:border-bengali-crimson dark:focus:border-bengali-gold'
                  } bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bengali-crimson/20 dark:focus:ring-bengali-gold/20 transition-colors`}
                />
                {errors.guestCount && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.guestCount}
                  </p>
                )}
              </div>
            </div>

            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('rsvp.event_selection')} *
              </label>
              <select
                value={formData.eventId}
                onChange={(e) => handleChange('eventId', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.eventId 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 dark:border-dark-600 focus:border-bengali-crimson dark:focus:border-bengali-gold'
                } bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bengali-crimson/20 dark:focus:ring-bengali-gold/20 transition-colors`}
              >
                <option value="">{t('rsvp.select_event')}</option>
                {weddingEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} - {new Date(event.date).toLocaleDateString()} at {event.time}
                  </option>
                ))}
              </select>
              {errors.eventId && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.eventId}
                </p>
              )}
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('rsvp.attending_question')}
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    checked={formData.attending === true}
                    onChange={() => handleChange('attending', true)}
                    className="h-4 w-4 text-bengali-crimson focus:ring-bengali-crimson border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{t('rsvp.yes_attending')}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    checked={formData.attending === false}
                    onChange={() => handleChange('attending', false)}
                    className="h-4 w-4 text-bengali-crimson focus:ring-bengali-crimson border-gray-300"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{t('rsvp.no_attending')}</span>
                </label>
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('rsvp.dietary_restrictions')}
              </label>
              <input
                type="text"
                value={formData.dietaryRestrictions}
                onChange={(e) => handleChange('dietaryRestrictions', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 focus:border-bengali-crimson dark:focus:border-bengali-gold bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bengali-crimson/20 dark:focus:ring-bengali-gold/20 transition-colors"
                placeholder={t('rsvp.dietary_placeholder')}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('rsvp.message')}
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-600 focus:border-bengali-crimson dark:focus:border-bengali-gold bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-bengali-crimson/20 dark:focus:ring-bengali-gold/20 transition-colors resize-none"
                placeholder={t('rsvp.message_placeholder')}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r from-bengali-deep-red to-bengali-crimson hover:from-bengali-crimson hover:to-bengali-deep-red text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t('rsvp.submitting')}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{t('rsvp.submit')}</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;