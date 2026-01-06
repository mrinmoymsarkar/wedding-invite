import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Download } from 'lucide-react';
import { EventDetails } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface CalendarButtonProps {
  event: EventDetails;
  variant?: 'google' | 'ics' | 'outlook';
  className?: string;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({ 
  event, 
  variant = 'google',
  className = ''
}) => {
  const { t } = useLanguage();

  const formatDateForCalendar = (date: string, time: string) => {
    // Convert to ISO format for calendar integration
    const eventDate = new Date(`${date}T${convertTo24Hour(time)}`);
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000); // Add 4 hours duration
    
    return {
      start: eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      startLocal: eventDate.toISOString(),
      endLocal: endDate.toISOString()
    };
  };

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    return `${hours.padStart(2, '0')}:${minutes}:00`;
  };

  const generateGoogleCalendarUrl = () => {
    const { start, end } = formatDateForCalendar(event.date, event.time);
    const title = encodeURIComponent(`${event.name} - Subhasree & Mrinmoy Wedding`);
    const details = encodeURIComponent(
      `${event.description}\n\nCultural Significance: ${event.significance}\n\nDress Code: ${event.dresscode}\n\nRituals:\n${event.rituals.map(ritual => `• ${ritual}`).join('\n')}`
    );
    const location = encodeURIComponent(event.venue);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  const generateICSFile = () => {
    const { startLocal, endLocal } = formatDateForCalendar(event.date, event.time);
    const startFormatted = new Date(startLocal).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endFormatted = new Date(endLocal).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Subhasree & Mrinmoy Wedding//Wedding Events//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@tanisunny-wedding.com`,
      `DTSTART:${startFormatted}`,
      `DTEND:${endFormatted}`,
      `SUMMARY:${event.name} - Subhasree & Mrinmoy Wedding`,
      `DESCRIPTION:${event.description}\\n\\nCultural Significance: ${event.significance}\\n\\nDress Code: ${event.dresscode}\\n\\nRituals:\\n${event.rituals.map(ritual => `• ${ritual}`).join('\\n')}`,
      `LOCATION:${event.venue}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Wedding Event Reminder',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.name.replace(/\s+/g, '-').toLowerCase()}-wedding-event.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateOutlookUrl = () => {
    const { startLocal, endLocal } = formatDateForCalendar(event.date, event.time);
    const title = encodeURIComponent(`${event.name} - Subhasree & Mrinmoy Wedding`);
    const body = encodeURIComponent(
      `${event.description}\n\nCultural Significance: ${event.significance}\n\nDress Code: ${event.dresscode}\n\nRituals:\n${event.rituals.map(ritual => `• ${ritual}`).join('\n')}`
    );
    const location = encodeURIComponent(event.venue);
    const startTime = encodeURIComponent(startLocal);
    const endTime = encodeURIComponent(endLocal);

    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${body}&location=${location}&startdt=${startTime}&enddt=${endTime}`;
  };

  const handleCalendarAction = () => {
    switch (variant) {
      case 'google':
        window.open(generateGoogleCalendarUrl(), '_blank');
        break;
      case 'ics':
        generateICSFile();
        break;
      case 'outlook':
        window.open(generateOutlookUrl(), '_blank');
        break;
    }
  };

  const getButtonConfig = () => {
    switch (variant) {
      case 'google':
        return {
          icon: Calendar,
          text: t('calendar.add_to_google'),
          color: 'bg-gradient-to-r from-bengali-deep-red to-bengali-crimson hover:from-bengali-crimson hover:to-bengali-deep-red',
          textColor: 'text-white',
          shadow: 'shadow-lg hover:shadow-xl'
        };
      case 'ics':
        return {
          icon: Download,
          text: t('calendar.download_ics'),
          color: 'bg-gradient-to-r from-bengali-gold to-bengali-amber hover:from-bengali-amber hover:to-bengali-gold',
          textColor: 'text-gray-900',
          shadow: 'shadow-lg hover:shadow-xl'
        };
      case 'outlook':
        return {
          icon: Calendar,
          text: t('calendar.add_to_outlook'),
          color: 'bg-gradient-to-r from-bengali-orange to-bengali-saffron hover:from-bengali-saffron hover:to-bengali-orange',
          textColor: 'text-white',
          shadow: 'shadow-lg hover:shadow-xl'
        };
    }
  };

  const config = getButtonConfig();
  const Icon = config.icon;

  return (
    <motion.button
      onClick={handleCalendarAction}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        boxShadow: "0 10px 30px rgba(220, 20, 60, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg ${config.color} ${config.textColor} text-sm font-medium transition-all duration-300 ${config.shadow} ${className}`}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="h-4 w-4" />
      </motion.div>
      <span>{config.text}</span>
    </motion.button>
  );
};

export default CalendarButton;