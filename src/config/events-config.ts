import { EventDetails } from '../types';

// Wedding Events Configuration - Edit this file to update event details
export const EVENTS_CONFIG: EventDetails[] = [
  {
    id: 'mehendi',
    name: 'Mehendi Ceremony',
    bengaliName: 'মেহেন্দি',
    date: '2028-02-27',
    time: '4:00 PM',
    venue: 'Bride\'s Family Home, West Bengal',
    description: 'A beautiful pre-wedding ceremony where intricate henna designs are applied to the bride\'s hands and feet, symbolizing joy, beauty, and spiritual awakening.',
    rituals: [
      'Henna application for bride and female relatives',
      'Traditional songs and dance',
      'Blessing ceremony by elders',
      'Evening feast with family and friends'
    ],
    significance: 'Mehendi is believed to bring good luck and fortune to the bride. The darker the henna color, the more the groom loves his bride according to tradition.',
    dresscode: 'Bright colors - Yellow, Orange, Pink. Traditional Bengali sarees encouraged.',
    photo: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg'
  },
  {
    id: 'gaye-holud',
    name: 'Gaye Holud',
    bengaliName: 'গায়ে হলুদ',
    date: '2028-02-28',
    time: '10:00 AM',
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
    date: '2028-02-29',
    time: '8:00 PM',
    venue: 'Heritage Palace, West Bengal',
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
    bengaliName: 'অভ্যর্থনা',
    date: '2028-03-01',
    time: '7:00 PM',
    venue: 'Grand Ballroom, West Bengal',
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
];