import { EventDetails } from '../types';
import { Language } from '../contexts/LanguageContext';

// Wedding Events Configuration - Multilingual
const EVENTS_BY_LANGUAGE: Record<Language, EventDetails[]> = {
  en: [
    {
      id: 'gaye-holud',
      name: 'Gaye Holud',
      bengaliName: 'গায়ে হলুদ',
      date: '2026-03-09',
      time: '',
      venue: 'Community Hall, West Bengal',
      description: 'The most vibrant Bengali pre-wedding ritual where turmeric paste is applied to both bride and groom at their respective homes, symbolizing purification and prosperity.',
      rituals: [
        'Turmeric ceremony for bride and groom',
        'Traditional Bengali breakfast',
        'Musical performances and dance',
        'Exchange of gifts between families',
        'Blessing with rice and fish'
      ],
      significance: 'Turmeric is considered auspicious and purifying in Bengali culture. This ceremony marks the beginning of the wedding festivities and blesses the couple with prosperity.',
      dresscode: 'Yellow is mandatory. Traditional Bengali attire preferred.',
      photo: 'https://images.pexels.com/photos/3018976/pexels-photo-3018976.jpeg'
    },
    {
      id: 'biye',
      name: 'Wedding Ceremony',
      bengaliName: 'বিয়ে',
      date: '2026-03-09',
      time: '6:03 PM',
      venue: 'Shanai Bhavan, Siliguri',
      description: 'The sacred Bengali wedding ceremony performed according to traditional Vedic rituals, marking the eternal union of two souls and their families.',
      rituals: [
        'Boron (Welcome ceremony for groom)',
        'Saat Paak (Seven rounds around groom)',
        'Shubho Drishti (First look exchange)',
        'Mala Badal (Exchange of garlands)',
        'Saat Paan and Sindoor Daan',
        'Agni Parikrama (Seven sacred rounds)',
        'Conch shell and traditional blessings'
      ],
      significance: 'The most sacred moment where two souls unite in the presence of Agni (fire) as witness. The seven rounds represent seven lifetimes of togetherness.',
      dresscode: 'Traditional Bengali wedding attire. Red and white for bride, cream dhoti for groom.',
      photo: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg'
    },
    {
      id: 'reception',
      name: 'Reception',
      bengaliName: 'রিসেপশন',
      date: '2026-03-22',
      time: '6:45 PM onwards',
      venue: 'RCF Community Hall, Alibag',
      description: 'A grand celebration to honor the newly married couple with family, friends, and the extended community, featuring traditional Bengali cuisine and cultural performances.',
      rituals: [
        'Welcome of guests by both families',
        'Cultural performances and music',
        'Traditional Bengali feast',
        'Photography and video sessions',
        'Blessing ceremony by community elders'
      ],
      significance: 'The reception celebrates the union with the wider community and marks the beginning of the couple\'s new journey together.',
      dresscode: 'Formal traditional or contemporary attire. All colors welcome.',
      photo: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg'
    }
  ],

  bn: [
    {
      id: 'gaye-holud',
      name: 'গায়ে হলুদ',
      bengaliName: 'গায়ে হলুদ',
      date: '2026-03-09',
      time: '',
      venue: 'কমিউনিটি হল, পশ্চিমবঙ্গ',
      description: 'বাঙালি বিবাহের সবচেয়ে প্রাণবন্ত প্রাক-বিবাহ অনুষ্ঠান, যেখানে বর ও কনে উভয়ের গায়ে হলুদ মাখানো হয়, যা শুদ্ধি ও সমৃদ্ধির প্রতীক।',
      rituals: [
        'বর ও কনের হলুদ মাখানো অনুষ্ঠান',
        'ঐতিহ্যবাহী বাঙালি জলখাবার',
        'গান ও নাচের আসর',
        'দুই পরিবারের মধ্যে উপহার বিনিময়',
        'ধান ও মাছ দিয়ে আশীর্বাদ'
      ],
      significance: 'বাঙালি সংস্কৃতিতে হলুদকে মঙ্গলকর ও শুদ্ধিকারক বলে মনে করা হয়। এই অনুষ্ঠান বিবাহ উৎসবের সূচনা করে এবং দম্পতিকে সমৃদ্ধির আশীর্বাদ দেয়।',
      dresscode: 'হলুদ রঙের পোশাক বাধ্যতামূলক। ঐতিহ্যবাহী বাঙালি পোশাক পছন্দনীয়।',
      photo: 'https://images.pexels.com/photos/3018976/pexels-photo-3018976.jpeg'
    },
    {
      id: 'biye',
      name: 'বিবাহ অনুষ্ঠান',
      bengaliName: 'বিয়ে',
      date: '2026-03-09',
      time: '৬:০৩ PM',
      venue: 'শানাই ভবন, শিলিগুড়ি',
      description: 'ঐতিহ্যবাহী বৈদিক রীতি অনুসারে অনুষ্ঠিত পবিত্র বাঙালি বিবাহ অনুষ্ঠান, যা দুটি আত্মা ও তাদের পরিবারের চিরন্তন মিলনের চিহ্ন।',
      rituals: [
        'বরণ (বরকে স্বাগত অনুষ্ঠান)',
        'সাতপাক (বরের চারপাশে সাতটি পরিক্রমা)',
        'শুভ দৃষ্টি (প্রথম দেখা)',
        'মালাবদল (মালা বিনিময়)',
        'সাতপাক ও সিঁদুরদান',
        'অগ্নি পরিক্রমা (সাতটি পবিত্র পরিক্রমা)',
        'শঙ্খধ্বনি ও ঐতিহ্যবাহী আশীর্বাদ'
      ],
      significance: 'সবচেয়ে পবিত্র মুহূর্ত যেখানে অগ্নিকে সাক্ষী রেখে দুটি আত্মা এক হয়। সাতটি পরিক্রমা সাত জন্মের একসঙ্গে থাকার প্রতীক।',
      dresscode: 'ঐতিহ্যবাহী বাঙালি বিবাহের পোশাক। কনের জন্য লাল ও সাদা, বরের জন্য ক্রিম রঙের ধুতি।',
      photo: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg'
    },
    {
      id: 'reception',
      name: 'রিসেপশন',
      bengaliName: 'রিসেপশন',
      date: '2026-03-22',
      time: '৬:৪৫ PM থেকে',
      venue: 'আরসিএফ কমিউনিটি হল, আলিবাগ',
      description: 'পরিবার, বন্ধু ও সমাজের সাথে নবদম্পতিকে সম্মান জানানোর একটি জমকালো উদযাপন, যেখানে ঐতিহ্যবাহী বাঙালি রান্না ও সাংস্কৃতিক অনুষ্ঠান থাকবে।',
      rituals: [
        'দুই পরিবারের পক্ষ থেকে অতিথিদের স্বাগত',
        'সাংস্কৃতিক অনুষ্ঠান ও সংগীত',
        'ঐতিহ্যবাহী বাঙালি ভোজ',
        'ফটোগ্রাফি ও ভিডিও',
        'সমাজের বয়োজ্যেষ্ঠদের আশীর্বাদ অনুষ্ঠান'
      ],
      significance: 'রিসেপশনে বৃহত্তর সমাজের সাথে মিলনকে উদযাপন করা হয় এবং দম্পতির নতুন জীবনযাত্রার সূচনা হয়।',
      dresscode: 'আনুষ্ঠানিক ঐতিহ্যবাহী বা আধুনিক পোশাক। সব রঙ স্বাগত।',
      photo: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg'
    }
  ],

  mr: [
    {
      id: 'gaye-holud',
      name: 'गाये होलुद',
      bengaliName: 'গায়ে হলুদ',
      date: '2026-03-09',
      time: '',
      venue: 'कम्युनिटी हॉल, पश्चिम बंगाल',
      description: 'बंगाली विवाहातील सर्वात उत्साही विवाहपूर्व विधी, ज्यामध्ये वर आणि वधू दोघांनाही त्यांच्या घरी हळद लावली जाते, जे शुद्धीकरण आणि समृद्धीचे प्रतीक आहे.',
      rituals: [
        'वर आणि वधूसाठी हळद समारंभ',
        'पारंपारिक बंगाली नाश्ता',
        'संगीत आणि नृत्य कार्यक्रम',
        'दोन कुटुंबांमध्ये भेटवस्तूंची देवाणघेवाण',
        'तांदूळ आणि माशाने आशीर्वाद'
      ],
      significance: 'बंगाली संस्कृतीत हळदीला शुभ आणि शुद्धीकारक मानले जाते. हा समारंभ विवाह उत्सवाची सुरुवात करतो आणि जोडप्याला समृद्धीचा आशीर्वाद देतो.',
      dresscode: 'पिवळा रंग अनिवार्य. पारंपारिक बंगाली पोशाख प्राधान्य.',
      photo: 'https://images.pexels.com/photos/3018976/pexels-photo-3018976.jpeg'
    },
    {
      id: 'biye',
      name: 'विवाह सोहळा',
      bengaliName: 'বিয়ে',
      date: '2026-03-09',
      time: '६:०३ PM',
      venue: 'शहनाई भवन, सिलीगुडी',
      description: 'पारंपारिक वैदिक विधींनुसार आयोजित पवित्र बंगाली विवाह सोहळा, जो दोन आत्मे आणि त्यांच्या कुटुंबांच्या शाश्वत मिलनाचे प्रतीक आहे.',
      rituals: [
        'बरण (वराचे स्वागत समारंभ)',
        'सातपाक (वराभोवती सात फेरे)',
        'शुभो दृष्टी (पहिली नजर)',
        'मालाबदल (हारांची देवाणघेवाण)',
        'सातपान आणि सिंदूरदान',
        'अग्नी परिक्रमा (सात पवित्र फेरे)',
        'शंखनाद आणि पारंपारिक आशीर्वाद'
      ],
      significance: 'सर्वात पवित्र क्षण जेथे अग्नीला साक्षी ठेवून दोन आत्मे एक होतात. सात फेरे सात जन्मांच्या सहजीवनाचे प्रतीक आहेत.',
      dresscode: 'पारंपारिक बंगाली विवाह पोशाख. वधूसाठी लाल आणि पांढरा, वरासाठी क्रीम रंगाचे धोतर.',
      photo: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg'
    },
    {
      id: 'reception',
      name: 'स्वागत समारंभ',
      bengaliName: 'রিসেপশন',
      date: '2026-03-22',
      time: '६:४५ PM पासून',
      venue: 'आरसीएफ कम्युनिटी हॉल, अलिबाग',
      description: 'कुटुंब, मित्र आणि समाजासह नवविवाहित जोडप्याचा सन्मान करण्यासाठी एक भव्य उत्सव, ज्यामध्ये पारंपारिक बंगाली पक्वान्ने आणि सांस्कृतिक कार्यक्रम असतील.',
      rituals: [
        'दोन्ही कुटुंबांकडून पाहुण्यांचे स्वागत',
        'सांस्कृतिक कार्यक्रम आणि संगीत',
        'पारंपारिक बंगाली मेजवानी',
        'फोटोग्राफी आणि व्हिडिओ',
        'समाजातील वडीलधाऱ्यांकडून आशीर्वाद समारंभ'
      ],
      significance: 'स्वागत समारंभ व्यापक समाजासह मिलनाचा उत्सव साजरा करतो आणि जोडप्याच्या नवीन प्रवासाची सुरुवात दर्शवतो.',
      dresscode: 'औपचारिक पारंपारिक किंवा आधुनिक पोशाख. सर्व रंगांचे स्वागत.',
      photo: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg'
    }
  ]
};

// Get events for a specific language
export function getEventsForLanguage(language: Language): EventDetails[] {
  return EVENTS_BY_LANGUAGE[language] || EVENTS_BY_LANGUAGE.en;
}

// Default English export for backward compatibility
export const EVENTS_CONFIG: EventDetails[] = EVENTS_BY_LANGUAGE.en;
