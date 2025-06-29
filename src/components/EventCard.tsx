import React from 'react';
import { Calendar, Clock, MapPin, Scroll } from 'lucide-react';
import { motion } from 'framer-motion';
import { EventDetails } from '../types';

interface EventCardProps {
  event: EventDetails;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-dark-800 rounded-2xl shadow-cultural hover:shadow-gold transition-all duration-300 overflow-hidden group"
    >
      {/* Event Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.photo}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-heading font-bold">{event.name}</h3>
          <p className="text-bengali-gold font-bengali text-lg">{event.bengaliName}</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6">
        {/* Date, Time, Venue */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Calendar className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <Clock className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <MapPin className="h-5 w-5 text-bengali-crimson dark:text-bengali-gold" />
            <span>{event.venue}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {event.description}
        </p>

        {/* Significance */}
        <div className="mb-6">
          <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-2 flex items-center">
            <Scroll className="h-4 w-4 mr-2" />
            Cultural Significance
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {event.significance}
          </p>
        </div>

        {/* Rituals */}
        <div className="mb-6">
          <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-3">
            Traditional Rituals
          </h4>
          <ul className="space-y-2">
            {event.rituals.map((ritual, idx) => (
              <li key={idx} className="text-gray-600 dark:text-gray-400 text-sm flex items-start">
                <span className="text-bengali-crimson dark:text-bengali-gold mr-2 mt-1">•</span>
                {ritual}
              </li>
            ))}
          </ul>
        </div>

        {/* Dress Code */}
        <div className="bg-bengali-cream dark:bg-dark-700 rounded-lg p-4">
          <h4 className="font-semibold text-bengali-deep-red dark:text-bengali-gold mb-2">
            Dress Code
          </h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {event.dresscode}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;