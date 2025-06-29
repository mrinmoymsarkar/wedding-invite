# Bengali Wedding Website - Easy Content Editing Guide

This wedding website is designed to be easily customizable. All content can be edited by modifying configuration files in the `src/config/` directory.

## 🎉 NEW: Content Management System (CMS)

**The easiest way to edit content is now through the web-based admin panel!**

### Access the Admin Panel:
1. **Go to**: `yourwebsite.com/admin` (replace with your actual domain)
2. **Login** with your GitHub account
3. **Edit content** through user-friendly forms
4. **Publish changes** instantly

### What You Can Edit Through CMS:
- ✅ **Couple Names** (English & Bengali)
- ✅ **Wedding Dates & Times**
- ✅ **Venue Information**
- ✅ **Contact Details**
- ✅ **Event Descriptions**
- ✅ **Photo Gallery**
- ✅ **Cultural Information**
- ✅ **All Website Text**
- ✅ **Upload New Images**

## 📝 Manual Editing (Alternative Method)

If you prefer to edit files directly, you can still modify the configuration files:

### 1. **Main Wedding Information** (`src/config/wedding-config.ts`)

Edit this file to update:
- **Couple Names**: Change bride/groom names in English and Bengali
- **Wedding Date & Time**: Update main wedding date and time
- **Venue Information**: Change wedding venue and location
- **Contact Details**: Update phone, email, and address
- **Blessings & Quotes**: Modify Bengali blessings and their translations
- **Website Branding**: Update site name, tagline, and image URLs

```typescript
// Example: Change couple names
couple: {
  bride: { name: 'YourBrideName', nameLocal: 'বাংলায় নাম' },
  groom: { name: 'YourGroomName', nameLocal: 'বাংলায় নাম' },
  coupleNames: 'Bride & Groom',
  coupleNamesLocal: 'বাংলায় নাম'
}
```

### 2. **Wedding Events** (`src/config/events-config.ts`)

Edit this file to update:
- **Event Details**: Date, time, venue for each ceremony
- **Event Descriptions**: Modify descriptions and significance
- **Rituals**: Update traditional rituals for each event
- **Dress Codes**: Change dress code requirements
- **Event Photos**: Update photo URLs

```typescript
// Example: Change event date and time
{
  id: 'mehendi',
  name: 'Mehendi Ceremony',
  date: '2028-02-27', // Change date here
  time: '4:00 PM',    // Change time here
  venue: 'Your Venue Name'
}
```

### 3. **Website Content** (`src/config/content-config.ts`)

Edit this file to update:
- **Section Descriptions**: Hero, events, gallery, culture descriptions
- **Guest Information**: Cultural etiquette and practical details
- **Success Messages**: RSVP confirmation messages
- **General Text Content**: Any other text content on the website

### 4. **Cultural Information** (`src/config/cultural-config.ts`)

Edit this file to update:
- **Cultural Traditions**: Bengali wedding traditions and their significance
- **Traditional Attire**: Information about wedding clothing
- **Wedding Cuisine**: Details about Bengali wedding food
- **Custom Traditions**: Add your family's specific traditions

### 5. **Photo Gallery** (`src/config/gallery-config.ts`)

Edit this file to update:
- **Gallery Images**: Replace image URLs with your own photos
- **Image Captions**: Update captions for each photo
- **Categories**: Modify gallery categories if needed

```typescript
// Example: Add your own photo
{
  id: 1,
  url: 'https://your-photo-url.com/image.jpg',
  caption: 'Your custom caption',
  category: 'mehendi'
}
```

## 🎨 Customization Tips

### **Colors & Styling**
- Colors are defined in `tailwind.config.js` under the `bengali` color palette
- You can modify colors by changing the hex values in the config

### **Fonts**
- Bengali font: Noto Sans Bengali
- English fonts: Playfair Display (headings), Inter (body)
- Font settings are in `tailwind.config.js`

### **Images**
- **Hero Image**: Update `heroImageUrl` in `wedding-config.ts`
- **Logo**: Update `logoUrl` in `wedding-config.ts`
- **Gallery Photos**: Update URLs in `gallery-config.ts`
- **Event Photos**: Update `photo` field in each event in `events-config.ts`

## 🌐 Language Support

The website supports three languages:
- **English** (en)
- **Bengali** (bn) 
- **Marathi** (mr)

Language translations are in `src/contexts/LanguageContext.tsx`. You can:
- Add new languages by extending the translations object
- Modify existing translations
- Add new translation keys for custom content

## 📱 Responsive Design

The website is fully responsive and works on:
- Mobile phones
- Tablets  
- Desktop computers
- All modern browsers

## 🚀 Quick Start Guide

### Using CMS (Recommended):
1. **Go to** `yourwebsite.com/admin`
2. **Login** with GitHub
3. **Edit content** through forms
4. **Publish** changes instantly

### Manual Editing:
1. **Update Basic Info**: Start with `wedding-config.ts` to change names, dates, and contact info
2. **Update Events**: Modify `events-config.ts` with your ceremony details
3. **Add Photos**: Replace image URLs in `gallery-config.ts` with your photos
4. **Customize Content**: Edit descriptions and text in `content-config.ts`
5. **Test**: Check the website to ensure all changes look correct

## 📞 Support

If you need help customizing the website:
1. Use the CMS admin panel for easy editing
2. Check this README for guidance
3. Look at the configuration files for examples
4. Make small changes and test them one at a time
5. Keep backups of your original files

## 🎯 File Structure

```
src/
├── config/           # 📝 EDIT THESE FILES
│   ├── wedding-config.ts      # Main wedding info
│   ├── events-config.ts       # Event details  
│   ├── content-config.ts      # Website content
│   ├── cultural-config.ts     # Cultural information
│   └── gallery-config.ts      # Photo gallery
├── components/       # React components (don't edit unless needed)
├── contexts/         # Language and theme settings
└── data/            # Data files (auto-generated from config)

public/
├── admin/           # 🎛️ CMS ADMIN PANEL
│   ├── index.html   # Admin interface
│   └── config.yml   # CMS configuration
```

**Remember**: 
- **Easiest**: Use the CMS admin panel at `/admin`
- **Advanced**: Edit files in the `src/config/` directory for content changes
- The other files contain the website's functionality and styling

## 🔐 Setting Up CMS Authentication

To enable the CMS admin panel:

1. **Deploy to Netlify** (if not already done)
2. **Enable Netlify Identity**:
   - Go to your Netlify dashboard
   - Navigate to Site settings > Identity
   - Click "Enable Identity"
3. **Enable Git Gateway**:
   - In Identity settings, scroll to "Services"
   - Enable "Git Gateway"
4. **Invite Users**:
   - Go to Identity tab
   - Click "Invite users"
   - Add email addresses of people who should edit content

That's it! Now you can access the admin panel and edit content easily.