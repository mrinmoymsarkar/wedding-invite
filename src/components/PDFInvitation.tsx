import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Heart, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { weddingEvents } from '../data/events';

const PDFInvitation: React.FC = () => {
  const { t, language } = useLanguage();

  const generateQRCode = (text: string, size: number = 150) => {
    // Using QR Server API for QR code generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=FFFFFF&color=8B0000&margin=10&format=png`;
  };

  const generatePDF = () => {
    // Create a new window for the PDF content
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const currentUrl = window.location.origin + window.location.pathname;
    const rsvpUrl = `${currentUrl}#rsvp`;
    const qrCodeUrl = generateQRCode(currentUrl);
    const heroImageUrl = 'https://1fimd9lwq61lrowk.public.blob.vercel-storage.com/wedding-pixar-D6EG6OvRCwxyNzdCoXbz3Yaifu5wlC.png';

    // PDF content with beautiful styling
    const pdfContent = `
      <!DOCTYPE html>
      <html lang="${language}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wedding Invitation - Subhasree & Mrinmoy</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #FFF8DC 0%, #FFFFF0 50%, #FFF8DC 100%);
            min-height: 100vh;
            padding: 20px;
          }
          
          .invitation-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(220, 20, 60, 0.15);
            overflow: hidden;
            position: relative;
          }
          
          .invitation-header {
            background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .invitation-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
          }
          
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .invitation-header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
          }
          
          .invitation-header .bengali-names {
            font-family: 'Noto Sans Bengali', sans-serif;
            font-size: 1.8rem;
            color: #FFD700;
            margin-bottom: 20px;
            position: relative;
            z-index: 2;
          }
          
          .invitation-header .blessing {
            font-family: 'Noto Sans Bengali', sans-serif;
            font-size: 1.2rem;
            color: #FFD700;
            font-style: italic;
            position: relative;
            z-index: 2;
          }
          
          .hero-image-section {
            padding: 30px;
            text-align: center;
            background: linear-gradient(135deg, #FFF8DC 0%, #FFFFF0 100%);
          }
          
          .hero-image {
            max-width: 300px;
            width: 100%;
            height: auto;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(220, 20, 60, 0.2);
            border: 3px solid #FFD700;
          }
          
          .invitation-content {
            padding: 40px 30px;
          }
          
          .welcome-message {
            text-align: center;
            margin-bottom: 40px;
            font-size: 1.1rem;
            color: #666;
            line-height: 1.8;
          }
          
          .events-section {
            margin-bottom: 40px;
          }
          
          .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: #8B0000;
            text-align: center;
            margin-bottom: 30px;
            position: relative;
          }
          
          .section-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: linear-gradient(90deg, #DC143C, #FFD700);
            border-radius: 2px;
          }
          
          .event-card {
            background: linear-gradient(135deg, #FFF8DC 0%, #FFFFF0 100%);
            border: 2px solid #FFD700;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
          }
          
          .event-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #DC143C, #FFD700, #FFC107);
          }
          
          .event-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            color: #8B0000;
            margin-bottom: 5px;
            font-weight: 600;
          }
          
          .event-bengali-name {
            font-family: 'Noto Sans Bengali', sans-serif;
            font-size: 1.2rem;
            color: #DC143C;
            margin-bottom: 15px;
          }
          
          .event-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
          }
          
          .event-detail {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #555;
          }
          
          .event-detail-icon {
            width: 16px;
            height: 16px;
            color: #DC143C;
          }
          
          .event-description {
            color: #666;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-top: 10px;
          }
          
          .rsvp-section {
            background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            margin-top: 30px;
          }
          
          .rsvp-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            margin-bottom: 15px;
          }
          
          .rsvp-message {
            font-size: 1.1rem;
            margin-bottom: 20px;
            line-height: 1.6;
          }
          
          .rsvp-links-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          
          .qr-code-section {
            text-align: center;
          }
          
          .qr-code {
            width: 120px;
            height: 120px;
            border: 3px solid #FFD700;
            border-radius: 10px;
            background: white;
            padding: 5px;
          }
          
          .qr-label {
            margin-top: 10px;
            font-size: 0.9rem;
            color: #FFD700;
            font-weight: 500;
          }
          
          .rsvp-url-section {
            flex: 1;
            min-width: 300px;
          }
          
          .rsvp-url {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #FFD700;
            border-radius: 10px;
            padding: 15px;
            font-family: 'Inter', monospace;
            font-size: 1rem;
            color: #FFD700;
            word-break: break-all;
            margin-bottom: 10px;
            text-decoration: none;
            display: block;
            transition: all 0.3s ease;
          }
          
          .rsvp-url:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
          }
          
          .url-label {
            font-size: 0.9rem;
            color: #FFD700;
            margin-bottom: 10px;
          }
          
          .rsvp-deadline {
            font-size: 0.9rem;
            color: #FFD700;
            font-style: italic;
            margin-top: 15px;
          }
          
          .footer {
            text-align: center;
            padding: 30px;
            background: #f8f9fa;
            color: #666;
            font-size: 0.9rem;
          }
          
          .footer-blessing {
            font-family: 'Noto Sans Bengali', sans-serif;
            color: #8B0000;
            font-size: 1rem;
            margin-bottom: 10px;
          }
          
          .decorative-border {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 2px solid #FFD700;
            border-radius: 15px;
            pointer-events: none;
            opacity: 0.3;
          }
          
          @media print {
            body {
              background: white;
              padding: 0;
            }
            
            .invitation-container {
              box-shadow: none;
              border: 2px solid #DC143C;
            }
            
            .invitation-header::before {
              display: none;
            }
            
            .rsvp-url {
              color: #8B0000 !important;
              border-color: #8B0000 !important;
            }
          }
          
          .contact-info {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          
          .contact-title {
            font-weight: 600;
            color: #8B0000;
            margin-bottom: 10px;
          }
          
          .contact-details {
            color: #666;
            font-size: 0.95rem;
          }
          
          .website-info {
            background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%);
            color: #8B0000;
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            text-align: center;
          }
          
          .website-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 10px;
          }
          
          .website-url {
            font-family: 'Inter', monospace;
            font-size: 1rem;
            color: #8B0000;
            text-decoration: none;
            font-weight: 500;
            border: 2px solid #8B0000;
            padding: 8px 15px;
            border-radius: 8px;
            display: inline-block;
            background: rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
          }
          
          .website-url:hover {
            background: rgba(255, 255, 255, 0.5);
            transform: translateY(-2px);
          }
        </style>
      </head>
      <body>
        <div class="invitation-container">
          <div class="decorative-border"></div>
          
          <div class="invitation-header">
            <h1>${t('hero.couple_names')}</h1>
            <div class="bengali-names">${t('hero.couple_names_local')}</div>
            <div class="blessing">${t('hero.blessed_wedding')}</div>
          </div>
          
          <div class="hero-image-section">
            <img src="${heroImageUrl}" alt="Subhasree & Mrinmoy Wedding Illustration" class="hero-image" />
          </div>
          
          <div class="invitation-content">
            <div class="welcome-message">
              ${language === 'bn' 
                ? 'আমাদের পবিত্র মিলন উদযাপনে আপনাকে আন্তরিকভাবে আমন্ত্রণ জানাচ্ছি। বাঙালি ঐতিহ্য ও সংস্কৃতির সাথে আমাদের এই আনন্দময় অনুষ্ঠানে আপনার উপস্থিতি আমাদের জন্য সম্মানের।'
                : language === 'mr'
                ? 'आमच्या पवित्र मिलनाच्या उत्सवात आम्ही तुम्हाला मनापासून आमंत्रित करतो. बंगाली परंपरा आणि संस्कृतीसह आमच्या या आनंदाच्या प्रसंगी तुमची उपस्थिती आमच्यासाठी सन्मानाची गोष्ट आहे.'
                : 'We cordially invite you to celebrate our sacred union. Your presence at our joyous occasion with Bengali traditions and culture would be an honor for us.'
              }
            </div>
            
            <div class="events-section">
              <h2 class="section-title">${t('events.title')}</h2>
              
              ${weddingEvents.map(event => `
                <div class="event-card">
                  <div class="event-name">${event.name}</div>
                  <div class="event-bengali-name">${event.bengaliName}</div>
                  
                  <div class="event-details">
                    <div class="event-detail">
                      <svg class="event-detail-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      ${new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    
                    <div class="event-detail">
                      <svg class="event-detail-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                      </svg>
                      ${event.time}
                    </div>
                    
                    <div class="event-detail">
                      <svg class="event-detail-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                      </svg>
                      ${event.venue}
                    </div>
                  </div>
                  
                  <div class="event-description">
                    ${event.description}
                  </div>
                </div>
              `).join('')}
            </div>
            
            <div class="contact-info">
              <div class="contact-title">${t('footer.contact_families')}</div>
              <div class="contact-details">
                📞 +91 98765 43210<br>
                ✉️ tani.sunny.wedding@gmail.com<br>
                📍 Heritage Palace, West Bengal, India
              </div>
            </div>
            
            <div class="website-info">
              <div class="website-title">
                ${language === 'bn' 
                  ? 'আমাদের ওয়েবসাইট দেখুন'
                  : language === 'mr'
                  ? 'आमची वेबसाइट भेट द्या'
                  : 'Visit Our Wedding Website'
                }
              </div>
              <a href="${currentUrl}" class="website-url" target="_blank">${currentUrl}</a>
            </div>
            
            <div class="rsvp-section">
              <h3 class="rsvp-title">${t('rsvp.title')}</h3>
              <div class="rsvp-message">
                ${language === 'bn' 
                  ? 'আমাদের বিশেষ দিনে আপনার উপস্থিতি নিশ্চিত করতে অনুগ্রহ করে নিচের QR কোড স্ক্যান করুন বা লিঙ্কে ক্লিক করুন:'
                  : language === 'mr'
                  ? 'आमच्या विशेष दिवशी तुमची उपस्थिती नोंदवण्यासाठी कृपया खालील QR कोड स्कॅन करा किंवा लिंकवर क्लिक करा:'
                  : 'Please confirm your presence on our special day by scanning the QR code below or clicking the link:'
                }
              </div>
              
              <div class="rsvp-links-container">
                <div class="qr-code-section">
                  <img src="${qrCodeUrl}" alt="QR Code for Wedding Website" class="qr-code" />
                  <div class="qr-label">
                    ${language === 'bn' 
                      ? 'QR কোড স্ক্যান করুন'
                      : language === 'mr'
                      ? 'QR कोड स्कॅन करा'
                      : 'Scan QR Code'
                    }
                  </div>
                </div>
                
                <div class="rsvp-url-section">
                  <div class="url-label">
                    ${language === 'bn' 
                      ? 'অথবা এই লিঙ্কে ক্লিক করুন:'
                      : language === 'mr'
                      ? 'किंवा या लिंकवर क्लिक करा:'
                      : 'Or click this link:'
                    }
                  </div>
                  <a href="${rsvpUrl}" class="rsvp-url" target="_blank">${rsvpUrl}</a>
                </div>
              </div>
              
              <div class="rsvp-deadline">
                ${language === 'bn' 
                  ? 'অনুগ্রহ করে ১৫ ফেব্রুয়ারি, ২০২৮ এর মধ্যে উত্তর দিন'
                  : language === 'mr'
                  ? 'कृपया १५ फेब्रुवारी, २०२८ पर्यंत उत्तर द्या'
                  : 'Please respond by February 15, 2028'
                }
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-blessing">${t('footer.quote')}</div>
            <div>${t('footer.quote_translation')}</div>
            <div style="margin-top: 15px; color: #8B0000;">
              ${t('footer.copyright')}
            </div>
          </div>
        </div>
        
        <script>
          // Auto-print when page loads
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 1000); // Increased delay to allow images to load
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(pdfContent);
    printWindow.document.close();
  };

  return (
    <motion.button
      onClick={generatePDF}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(220, 20, 60, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-bengali-gold to-bengali-amber hover:from-bengali-amber hover:to-bengali-gold text-gray-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative flex-shrink-0"
      >
        <FileText className="h-4 w-4 md:h-5 md:w-5" />
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-bengali-crimson rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5
          }}
        />
      </motion.div>
      
      <span className="text-sm md:text-base font-medium text-center">
        {language === 'bn' 
          ? 'আমন্ত্রণপত্র ডাউনলোড করুন'
          : language === 'mr'
          ? 'आमंत्रण डाउनलोड करा'
          : 'Download Invitation'
        }
      </span>
      
      <motion.div
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
        animate={{ x: [0, 5, 0] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Download className="h-3 w-3 md:h-4 md:w-4" />
      </motion.div>
    </motion.button>
  );
};

export default PDFInvitation;