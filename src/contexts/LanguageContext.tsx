import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'bn' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.gallery': 'Gallery',
    'nav.culture': 'Culture',
    'nav.rsvp': 'RSVP',
    
    // Hero Section
    'hero.sacred_union': 'Sacred Union',
    'hero.blessed_wedding': 'শুভ বিবাহ',
    'hero.couple_names': 'Subhasree & Mrinmoy',
    'hero.couple_names_local': 'শুভশ্রী ও মৃন্ময়',
    'hero.wedding_date': 'March 09, 2026',
    'hero.venue': 'Shanai Bhavan, Siliguri',
    'hero.countdown_title': 'Days Until Our Sacred Union',
    'hero.countdown.days': 'Days',
    'hero.countdown.hours': 'Hours',
    'hero.countdown.minutes': 'Minutes',
    'hero.countdown.seconds': 'Seconds',
    'hero.rsvp_button': 'RSVP Now',
    'hero.join_celebration': 'Join us in celebrating our sacred union with Bengali traditions and blessings',
    'hero.blessing': 'শুভস্য শীঘ্রম্ — শুভ বিবাহ',
    'hero.blessing_translation': 'May this sacred union be blessed and prosperous',

    // Events Section
    'events.title': 'Wedding Events',
    'events.title_local': 'বিবাহের অনুষ্ঠানসমূহ',
    'events.description': 'Join us in celebrating a traditional Bengali wedding with authentic rituals, cultural ceremonies, and joyous festivities spanning multiple days. Each event holds deep cultural significance and represents centuries of Bengali traditions.',
    'events.cultural_significance': 'Cultural Significance',
    'events.traditional_rituals': 'Traditional Rituals',
    'events.dress_code': 'Dress Code',
    'events.guest_info_title': 'Important Information for Guests',
    'events.cultural_etiquette': 'Cultural Etiquette',
    'events.practical_details': 'Practical Details',
    'events.celebrate_with_us': 'Celebrate With Us',
    'events.etiquette_1': 'Please remove shoes before entering ceremonial areas',
    'events.etiquette_2': 'Modest dress is appreciated for religious ceremonies',
    'events.etiquette_3': 'Photography may be restricted during sacred rituals',
    'events.etiquette_4': 'Touching elders\' feet is a sign of respect',
    'events.etiquette_5': 'Wait for the couple\'s blessing before taking gifts',
    'events.practical_1': 'Parking will be available at all venues',
    'events.practical_2': 'Vegetarian and non-vegetarian meals will be served',
    'events.practical_3': 'Special arrangements for elderly guests',
    'events.practical_4': 'Contact family for accommodation assistance',
    'events.practical_5': 'Traditional Bengali sweets will be distributed',

    // Gallery Section
    'gallery.title': 'Photo Gallery',
    'gallery.title_local': 'ছবির গ্যালারি',
    'gallery.description': 'Capturing precious moments from our journey together and the beautiful ceremonies that mark our sacred union in Bengali traditions.',
    'gallery.all_photos': 'All Photos',
    'gallery.all_photos_local': 'সব ছবি',
    'gallery.mehendi': 'Mehendi',
    'gallery.mehendi_local': 'মেহেন্দি',
    'gallery.gaye_holud': 'Gaye Holud',
    'gallery.gaye_holud_local': 'গায়ে হলুদ',
    'gallery.ceremony': 'Ceremony',
    'gallery.ceremony_local': 'বিয়ে',
    'gallery.reception': 'Reception',
    'gallery.reception_local': 'রিসেপশন',
    'gallery.pre_wedding': 'Pre-Wedding',
    'gallery.pre_wedding_local': 'প্রি-ওয়েডিং',

    // Culture Section
    'culture.title': 'Bengali Wedding Culture',
    'culture.title_local': 'বাঙালি বিবাহের সংস্কৃতি',
    'culture.description': 'Explore the rich traditions, customs, and cultural significance of Bengali weddings that have been passed down through generations, representing the sacred bond of marriage.',
    'culture.key_traditions': 'Key Traditions',
    'culture.blessings_title': 'Traditional Bengali Wedding Blessings',
    'culture.bride_blessing': 'For the Bride (কন্যার জন্য)',
    'culture.bride_blessing_text': 'সুবহগা হও, পুত্রবতী হও, আয়ুষ্মতী হও',
    'culture.bride_blessing_translation': 'May you be blessed with good fortune, children, and long life',
    'culture.couple_blessing': 'For the Couple (দম্পতির জন্য)',
    'culture.couple_blessing_text': 'শুভ বিবাহ, শুভ জীবন, সুখী দাম্পত্য',
    'culture.couple_blessing_translation': 'Blessed wedding, blessed life, happy married life',

    // RSVP Section
    'rsvp.title': 'RSVP',
    'rsvp.title_local': 'উপস্থিতি নিশ্চিত করুন',
    'rsvp.description': 'We would be honored by your presence at our wedding celebration. Please let us know if you\'ll be joining us for this sacred occasion.',
    'rsvp.full_name': 'Full Name',
    'rsvp.email': 'Email Address',
    'rsvp.phone': 'Phone Number',
    'rsvp.guest_count': 'Number of Guests',
    'rsvp.event_selection': 'Which event will you attend?',
    'rsvp.select_event': 'Select an event',
    'rsvp.attending_question': 'Will you be attending?',
    'rsvp.yes_attending': 'Yes, I\'ll be there',
    'rsvp.no_attending': 'Sorry, can\'t make it',
    'rsvp.dietary_restrictions': 'Dietary Restrictions or Allergies',
    'rsvp.dietary_placeholder': 'Please let us know about any dietary requirements',
    'rsvp.message': 'Special Message or Wishes',
    'rsvp.message_placeholder': 'Share your blessings, wishes, or any special message for the couple',
    'rsvp.submit': 'Send RSVP',
    'rsvp.submitting': 'Submitting...',
    'rsvp.success_title': 'Thank You for Your RSVP!',
    'rsvp.success_subtitle': 'আপনার উপস্থিতির জন্য ধন্যবাদ',
    'rsvp.success_message': 'We\'re delighted that you\'ll be joining us for our special celebration. You\'ll receive a confirmation email shortly with all the details.',

    // Calendar Integration
    'calendar.add_to_calendar': 'Add to Calendar',
    'calendar.never_miss_event': 'Never miss this special moment',
    'calendar.add_to_google': 'Add to Google Calendar',
    'calendar.add_to_outlook': 'Add to Outlook',
    'calendar.download_ics': 'Download Calendar File',
    'calendar.choose_calendar': 'Choose your calendar app:',
    'calendar.download_file': 'Or download calendar file:',
    'calendar.ics_description': 'Compatible with Apple Calendar, Outlook, and other calendar apps',
    'calendar.reminder_included': 'Reminder included!',
    'calendar.reminder_description': 'You\'ll get a notification 1 hour before the event starts.',

    // Footer
    'footer.brand': 'Sacred Union',
    'footer.tagline': 'Celebrating the eternal bond of love with Bengali traditions and cultural heritage.',
    'footer.blessing_footer': 'তারপর পথ হারালো তোমায় আমায় নিয়ে',
    'footer.quick_links': 'Quick Links',
    'footer.contact_families': 'Contact Families',
    'footer.wedding_timeline': 'Wedding Timeline',
    'footer.copyright': '© 2026 Subhasree & Mrinmoy Wedding. Made with love and Bengali traditions.',
    'footer.quote': 'তারপর পথ হারালো তোমায় আমায় নিয়ে',
    'footer.quote_translation': 'Then the path was lost, taking you and me',

    // Common
    'common.required': 'required',
    'common.optional': 'optional',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.events': 'অনুষ্ঠান',
    'nav.gallery': 'গ্যালারি',
    'nav.culture': 'সংস্কৃতি',
    'nav.rsvp': 'উপস্থিতি',

    // Hero Section
    'hero.sacred_union': 'শুভ মিলন',
    'hero.blessed_wedding': 'শুভ বিবাহ',
    'hero.couple_names': 'শুভশ্রী ও মৃন্ময়',
    'hero.couple_names_local': 'শুভশ্রী ও মৃন্ময়',
    'hero.wedding_date': '৯ মার্চ, ২০২৬',
    'hero.venue': 'শানাই ভবন, শিলিগুড়ি',
    'hero.countdown_title': 'আমাদের শুভ মিলনের বাকি দিন',
    'hero.countdown.days': 'দিন',
    'hero.countdown.hours': 'ঘন্টা',
    'hero.countdown.minutes': 'মিনিট',
    'hero.countdown.seconds': 'সেকেন্ড',
    'hero.rsvp_button': 'উপস্থিতি নিশ্চিত করুন',
    'hero.join_celebration': 'বাঙালি ঐতিহ্য ও আশীর্বাদে আমাদের শুভ বিবাহ উদযাপনে আপনাদের সাদর আমন্ত্রণ',
    'hero.blessing': 'শুভস্য শীঘ্রম্ — শুভ বিবাহ',
    'hero.blessing_translation': 'এই শুভ মিলন মঙ্গলময় ও সমৃদ্ধ হোক',

    // Events Section
    'events.title': 'বিবাহের অনুষ্ঠানসমূহ',
    'events.title_local': 'বিবাহের অনুষ্ঠানসমূহ',
    'events.description': 'ঐতিহ্যবাহী আচার-অনুষ্ঠান, সাংস্কৃতিক অনুষ্ঠান এবং একাধিক দিন ব্যাপী আনন্দময় উৎসবের সাথে একটি বাঙালি বিবাহ উদযাপনে আমাদের সাথে যোগ দিন। প্রতিটি অনুষ্ঠানের গভীর সাংস্কৃতিক তাৎপর্য রয়েছে এবং শতাব্দীর বাঙালি ঐতিহ্যের প্রতিনিধিত্ব করে।',
    'events.cultural_significance': 'সাংস্কৃতিক তাৎপর্য',
    'events.traditional_rituals': 'ঐতিহ্যবাহী আচার-অনুষ্ঠান',
    'events.dress_code': 'পোশাক নির্দেশিকা',
    'events.guest_info_title': 'অতিথিদের জন্য গুরুত্বপূর্ণ তথ্য',
    'events.cultural_etiquette': 'সাংস্কৃতিক শিষ্টাচার',
    'events.practical_details': 'ব্যবহারিক বিবরণ',
    'events.celebrate_with_us': 'আমাদের সাথে উদযাপন করুন',
    'events.etiquette_1': 'অনুষ্ঠানস্থলে প্রবেশের আগে জুতা খুলে রাখুন',
    'events.etiquette_2': 'ধর্মীয় অনুষ্ঠানে শালীন পোশাক পরিধান করুন',
    'events.etiquette_3': 'পবিত্র আচার-অনুষ্ঠানের সময় ছবি তোলা সীমিত থাকতে পারে',
    'events.etiquette_4': 'বড়দের পায়ে হাত দেওয়া শ্রদ্ধার চিহ্ন',
    'events.etiquette_5': 'উপহার দেওয়ার আগে দম্পতির আশীর্বাদের জন্য অপেক্ষা করুন',
    'events.practical_1': 'সকল ভেন্যুতে পার্কিং এর ব্যবস্থা থাকবে',
    'events.practical_2': 'নিরামিষ ও আমিষ দুই ধরনের খাবার পরিবেশন করা হবে',
    'events.practical_3': 'বয়স্ক অতিথিদের জন্য বিশেষ ব্যবস্থা রয়েছে',
    'events.practical_4': 'থাকার ব্যবস্থার জন্য পরিবারের সাথে যোগাযোগ করুন',
    'events.practical_5': 'ঐতিহ্যবাহী বাঙালি মিষ্টি বিতরণ করা হবে',

    // Gallery Section
    'gallery.title': 'ছবির গ্যালারি',
    'gallery.title_local': 'ছবির গ্যালারি',
    'gallery.description': 'বাঙালি ঐতিহ্যে আমাদের শুভ মিলনের সুন্দর অনুষ্ঠান ও একসাথে পথচলার স্মরণীয় মুহূর্তের সংকলন।',
    'gallery.all_photos': 'সব ছবি',
    'gallery.all_photos_local': 'সব ছবি',
    'gallery.mehendi': 'মেহেন্দি',
    'gallery.mehendi_local': 'মেহেন্দি',
    'gallery.gaye_holud': 'গায়ে হলুদ',
    'gallery.gaye_holud_local': 'গায়ে হলুদ',
    'gallery.ceremony': 'বিয়ে',
    'gallery.ceremony_local': 'বিয়ে',
    'gallery.reception': 'রিসেপশন',
    'gallery.reception_local': 'রিসেপশন',
    'gallery.pre_wedding': 'বিবাহ-পূর্ব',
    'gallery.pre_wedding_local': 'বিবাহ-পূর্ব',

    // Culture Section
    'culture.title': 'বাঙালি বিবাহের সংস্কৃতি',
    'culture.title_local': 'বাঙালি বিবাহের সংস্কৃতি',
    'culture.description': 'প্রজন্ম থেকে প্রজন্মে চলে আসা বাঙালি বিবাহের সমৃদ্ধ ঐতিহ্য, রীতিনীতি এবং সাংস্কৃতিক তাৎপর্য অন্বেষণ করুন, যা বিবাহের পবিত্র বন্ধনের প্রতিনিধিত্ব করে।',
    'culture.key_traditions': 'মূল ঐতিহ্য',
    'culture.blessings_title': 'ঐতিহ্যবাহী বাঙালি বিবাহের আশীর্বাদ',
    'culture.bride_blessing': 'কন্যার জন্য',
    'culture.bride_blessing_text': 'সুবহগা হও, পুত্রবতী হও, আয়ুষ্মতী হও',
    'culture.bride_blessing_translation': 'তুমি সৌভাগ্য, সন্তান এবং দীর্ঘায়ুর আশীর্বাদ পাও',
    'culture.couple_blessing': 'দম্পতির জন্য',
    'culture.couple_blessing_text': 'শুভ বিবাহ, শুভ জীবন, সুখী দাম্পত্য',
    'culture.couple_blessing_translation': 'মঙ্গলময় বিবাহ, মঙ্গলময় জীবন, সুখী দাম্পত্য জীবন',

    // RSVP Section
    'rsvp.title': 'উপস্থিতি নিশ্চিত করুন',
    'rsvp.title_local': 'উপস্থিতি নিশ্চিত করুন',
    'rsvp.description': 'আমাদের বিবাহ উদযাপনে আপনার উপস্থিতিতে আমরা সম্মানিত হব। এই শুভ অনুষ্ঠানে আপনি আমাদের সাথে যোগ দেবেন কিনা দয়া করে জানান।',
    'rsvp.full_name': 'পূর্ণ নাম',
    'rsvp.email': 'ইমেইল ঠিকানা',
    'rsvp.phone': 'ফোন নম্বর',
    'rsvp.guest_count': 'অতিথি সংখ্যা',
    'rsvp.event_selection': 'আপনি কোন অনুষ্ঠানে উপস্থিত থাকবেন?',
    'rsvp.select_event': 'একটি অনুষ্ঠান নির্বাচন করুন',
    'rsvp.attending_question': 'আপনি কি উপস্থিত থাকবেন?',
    'rsvp.yes_attending': 'হ্যাঁ, আমি থাকব',
    'rsvp.no_attending': 'দুঃখিত, আসতে পারব না',
    'rsvp.dietary_restrictions': 'খাদ্য বিধিনিষেধ বা অ্যালার্জি',
    'rsvp.dietary_placeholder': 'দয়া করে কোনো খাদ্যগত প্রয়োজনীয়তা সম্পর্কে জানান',
    'rsvp.message': 'বিশেষ বার্তা বা শুভেচ্ছা',
    'rsvp.message_placeholder': 'দম্পতির জন্য আপনার আশীর্বাদ, শুভেচ্ছা বা কোনো বিশেষ বার্তা শেয়ার করুন',
    'rsvp.submit': 'উপস্থিতি জানান',
    'rsvp.submitting': 'পাঠানো হচ্ছে...',
    'rsvp.success_title': 'আপনার উপস্থিতির জন্য ধন্যবাদ!',
    'rsvp.success_subtitle': 'আপনার উপস্থিতির জন্য ধন্যবাদ',
    'rsvp.success_message': 'আমাদের বিশেষ উদযাপনে আপনি যোগ দেবেন জেনে আমরা আনন্দিত। শীঘ্রই আপনি সমস্ত বিবরণ সহ একটি নিশ্চিতকরণ ইমেইল পাবেন।',

    // Calendar Integration
    'calendar.add_to_calendar': 'ক্যালেন্ডারে যোগ করুন',
    'calendar.never_miss_event': 'এই বিশেষ মুহূর্তটি মিস করবেন না',
    'calendar.add_to_google': 'গুগল ক্যালেন্ডারে যোগ করুন',
    'calendar.add_to_outlook': 'আউটলুকে যোগ করুন',
    'calendar.download_ics': 'ক্যালেন্ডার ফাইল ডাউনলোড করুন',
    'calendar.choose_calendar': 'আপনার ক্যালেন্ডার অ্যাপ বেছে নিন:',
    'calendar.download_file': 'অথবা ক্যালেন্ডার ফাইল ডাউনলোড করুন:',
    'calendar.ics_description': 'অ্যাপল ক্যালেন্ডার, আউটলুক এবং অন্যান্য ক্যালেন্ডার অ্যাপের সাথে সামঞ্জস্যপূর্ণ',
    'calendar.reminder_included': 'রিমাইন্ডার অন্তর্ভুক্ত!',
    'calendar.reminder_description': 'অনুষ্ঠান শুরুর ১ ঘন্টা আগে আপনি একটি বিজ্ঞপ্তি পাবেন।',

    // Footer
    'footer.brand': 'শুভ মিলন',
    'footer.tagline': 'বাঙালি ঐতিহ্য ও সংস্কৃতির সাথে ভালোবাসার চিরন্তন বন্ধন উদযাপন।',
    'footer.blessing_footer': 'তারপর পথ হারালো তোমায় আমায় নিয়ে',
    'footer.quick_links': 'দ্রুত লিঙ্ক',
    'footer.contact_families': 'পরিবারের যোগাযোগ',
    'footer.wedding_timeline': 'বিবাহের সময়সূচী',
    'footer.copyright': '© ২০২৬ শুভশ্রী ও মৃন্ময় বিবাহ। ভালোবাসা ও বাঙালি ঐতিহ্যের সাথে তৈরি।',
    'footer.quote': 'তারপর পথ হারালো তোমায় আমায় নিয়ে',
    'footer.quote_translation': 'তারপর পথ হারালো তোমায় আমায় নিয়ে',

    // Common
    'common.required': 'আবশ্যক',
    'common.optional': 'ঐচ্ছিক',
    'common.loading': 'লোড হচ্ছে...',
    'common.error': 'ত্রুটি',
    'common.success': 'সফল',
  },

  mr: {
    // Navigation
    'nav.home': 'मुख्यपृष्ठ',
    'nav.events': 'कार्यक्रम',
    'nav.gallery': 'गॅलरी',
    'nav.culture': 'संस्कृती',
    'nav.rsvp': 'उपस्थिती',

    // Hero Section
    'hero.sacred_union': 'शुभमंगल',
    'hero.blessed_wedding': 'शुभ विवाह',
    'hero.couple_names': 'शुभश्री आणि मृन्मय',
    'hero.couple_names_local': 'शुभश्री आणि मृन्मय',
    'hero.wedding_date': '९ मार्च, २०२६',
    'hero.venue': 'शहनाई भवन, सिलीगुडी',
    'hero.countdown_title': 'आमच्या शुभ विवाहापर्यंत दिवस',
    'hero.countdown.days': 'दिवस',
    'hero.countdown.hours': 'तास',
    'hero.countdown.minutes': 'मिनिटे',
    'hero.countdown.seconds': 'सेकंद',
    'hero.rsvp_button': 'उपस्थिती कळवा',
    'hero.join_celebration': 'बंगाली परंपरा आणि आशीर्वादांसह आमच्या शुभ विवाहाचा उत्सव साजरा करण्यासाठी आमच्यात सामील व्हा',
    'hero.blessing': 'शुभस्य शीघ्रम् — शुभ विवाह',
    'hero.blessing_translation': 'हे पवित्र मिलन मंगलमय आणि समृद्ध होवो',

    // Events Section
    'events.title': 'विवाह कार्यक्रम',
    'events.title_local': 'लग्नसोहळा',
    'events.description': 'पारंपारिक विधी, सांस्कृतिक समारंभ आणि अनेक दिवसांच्या आनंदी उत्सवांसह बंगाली विवाहाचा उत्सव साजरा करण्यासाठी आमच्यात सामील व्हा. प्रत्येक कार्यक्रमाचे खोल सांस्कृतिक महत्त्व आहे आणि शतकानुशतकांच्या बंगाली परंपरांचे प्रतिनिधित्व करते.',
    'events.cultural_significance': 'सांस्कृतिक महत्त्व',
    'events.traditional_rituals': 'पारंपारिक विधी',
    'events.dress_code': 'पोशाख संहिता',
    'events.guest_info_title': 'पाहुण्यांसाठी महत्त्वाची माहिती',
    'events.cultural_etiquette': 'सांस्कृतिक शिष्टाचार',
    'events.practical_details': 'व्यावहारिक तपशील',
    'events.celebrate_with_us': 'आमच्यासोबत उत्सव साजरा करा',
    'events.etiquette_1': 'कृपया समारंभ स्थळात प्रवेश करण्यापूर्वी चपला काढा',
    'events.etiquette_2': 'धार्मिक समारंभांसाठी शालीन पोशाख अपेक्षित',
    'events.etiquette_3': 'पवित्र विधींदरम्यान फोटोग्राफी प्रतिबंधित असू शकते',
    'events.etiquette_4': 'वडीलधाऱ्यांच्या पाया पडणे हा आदराचा प्रतीक आहे',
    'events.etiquette_5': 'भेटवस्तू देण्यापूर्वी जोडप्याच्या आशीर्वादाची प्रतीक्षा करा',
    'events.practical_1': 'सर्व ठिकाणी पार्किंगची व्यवस्था असेल',
    'events.practical_2': 'शाकाहारी आणि मांसाहारी दोन्ही जेवणाची व्यवस्था असेल',
    'events.practical_3': 'वयोवृद्ध पाहुण्यांसाठी विशेष व्यवस्था',
    'events.practical_4': 'निवासाच्या व्यवस्थेसाठी कुटुंबाशी संपर्क साधा',
    'events.practical_5': 'पारंपारिक बंगाली मिठाईचे वाटप केले जाईल',

    // Gallery Section
    'gallery.title': 'फोटो गॅलरी',
    'gallery.title_local': 'फोटो गॅलरी',
    'gallery.description': 'बंगाली परंपरांमध्ये आमच्या शुभ मिलनाचे सुंदर समारंभ आणि एकत्र प्रवासातील स्मरणीय क्षणांचा संग्रह.',
    'gallery.all_photos': 'सर्व फोटो',
    'gallery.all_photos_local': 'सर्व फोटो',
    'gallery.mehendi': 'मेहंदी',
    'gallery.mehendi_local': 'मेहंदी',
    'gallery.gaye_holud': 'गाये होलुद',
    'gallery.gaye_holud_local': 'गाये होलुद',
    'gallery.ceremony': 'विवाह',
    'gallery.ceremony_local': 'विवाह',
    'gallery.reception': 'स्वागत समारंभ',
    'gallery.reception_local': 'स्वागत समारंभ',
    'gallery.pre_wedding': 'विवाहपूर्व',
    'gallery.pre_wedding_local': 'विवाहपूर्व',

    // Culture Section
    'culture.title': 'बंगाली विवाह संस्कृती',
    'culture.title_local': 'बंगाली विवाह संस्कृती',
    'culture.description': 'पिढ्यानपिढ्या चालत आलेल्या बंगाली विवाहांच्या समृद्ध परंपरा, रीतिरिवाज आणि सांस्कृतिक महत्त्वाचा शोध घ्या, जे विवाहाच्या पवित्र बंधनाचे प्रतिनिधित्व करतात.',
    'culture.key_traditions': 'मुख्य परंपरा',
    'culture.blessings_title': 'पारंपारिक बंगाली विवाह आशीर्वाद',
    'culture.bride_blessing': 'वधूसाठी',
    'culture.bride_blessing_text': 'सुभगा हो, पुत्रवती हो, आयुष्मती हो',
    'culture.bride_blessing_translation': 'तुम्हाला सौभाग्य, संतती आणि दीर्घायुष्याचा आशीर्वाद मिळो',
    'culture.couple_blessing': 'जोडप्यासाठी',
    'culture.couple_blessing_text': 'शुभ विवाह, शुभ जीवन, सुखी दाम्पत्य',
    'culture.couple_blessing_translation': 'मंगलमय विवाह, मंगलमय जीवन, आनंदी वैवाहिक जीवन',

    // RSVP Section
    'rsvp.title': 'उपस्थिती कळवा',
    'rsvp.title_local': 'उपस्थिती कळवा',
    'rsvp.description': 'आमच्या विवाह उत्सवात तुमच्या उपस्थितीने आम्हाला सन्मान वाटेल. या शुभ प्रसंगी तुम्ही आमच्यात सामील व्हाल का ते कृपया कळवा.',
    'rsvp.full_name': 'पूर्ण नाव',
    'rsvp.email': 'ईमेल पत्ता',
    'rsvp.phone': 'फोन नंबर',
    'rsvp.guest_count': 'पाहुण्यांची संख्या',
    'rsvp.event_selection': 'तुम्ही कोणत्या कार्यक्रमाला उपस्थित राहाल?',
    'rsvp.select_event': 'एक कार्यक्रम निवडा',
    'rsvp.attending_question': 'तुम्ही उपस्थित राहाल का?',
    'rsvp.yes_attending': 'होय, मी येईन',
    'rsvp.no_attending': 'माफ करा, येऊ शकत नाही',
    'rsvp.dietary_restrictions': 'आहारातील निर्बंध किंवा ऍलर्जी',
    'rsvp.dietary_placeholder': 'कृपया कोणत्याही आहारातील गरजांबद्दल कळवा',
    'rsvp.message': 'विशेष संदेश किंवा शुभेच्छा',
    'rsvp.message_placeholder': 'जोडप्यासाठी तुमचे आशीर्वाद, शुभेच्छा किंवा कोणताही विशेष संदेश शेअर करा',
    'rsvp.submit': 'उपस्थिती कळवा',
    'rsvp.submitting': 'पाठवत आहे...',
    'rsvp.success_title': 'तुमच्या उपस्थितीसाठी धन्यवाद!',
    'rsvp.success_subtitle': 'तुमच्या उपस्थितीसाठी धन्यवाद',
    'rsvp.success_message': 'आमच्या विशेष उत्सवात तुम्ही सामील व्हाल हे जाणून आम्हाला आनंद झाला. तुम्हाला लवकरच सर्व तपशीलांसह पुष्टीकरण ईमेल मिळेल.',

    // Calendar Integration
    'calendar.add_to_calendar': 'कॅलेंडरमध्ये जोडा',
    'calendar.never_miss_event': 'हा विशेष क्षण चुकवू नका',
    'calendar.add_to_google': 'गूगल कॅलेंडरमध्ये जोडा',
    'calendar.add_to_outlook': 'आउटलुकमध्ये जोडा',
    'calendar.download_ics': 'कॅलेंडर फाइल डाउनलोड करा',
    'calendar.choose_calendar': 'तुमचे कॅलेंडर अॅप निवडा:',
    'calendar.download_file': 'किंवा कॅलेंडर फाइल डाउनलोड करा:',
    'calendar.ics_description': 'अॅपल कॅलेंडर, आउटलुक आणि इतर कॅलेंडर अॅप्ससह सुसंगत',
    'calendar.reminder_included': 'रिमाइंडर समाविष्ट!',
    'calendar.reminder_description': 'कार्यक्रम सुरू होण्याच्या १ तास आधी तुम्हाला सूचना मिळेल.',

    // Footer
    'footer.brand': 'शुभमंगल',
    'footer.tagline': 'बंगाली परंपरा आणि सांस्कृतिक वारशासह प्रेमाच्या शाश्वत बंधनाचा उत्सव.',
    'footer.blessing_footer': 'तारपर पथ हारालो तोमाय आमाय निये',
    'footer.quick_links': 'महत्त्वाचे दुवे',
    'footer.contact_families': 'कुटुंबांशी संपर्क',
    'footer.wedding_timeline': 'विवाह वेळापत्रक',
    'footer.copyright': '© २०२६ शुभश्री आणि मृन्मय विवाह. प्रेम आणि बंगाली परंपरांनी बनवले.',
    'footer.quote': 'तारपर पथ हारालो तोमाय आमाय निये',
    'footer.quote_translation': 'मग वाट हरवली, तुला आणि मला घेऊन',

    // Common
    'common.required': 'आवश्यक',
    'common.optional': 'ऐच्छिक',
    'common.loading': 'लोड होत आहे...',
    'common.error': 'त्रुटी',
    'common.success': 'यशस्वी',
  }
};