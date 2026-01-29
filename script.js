// ===== CONFIGURATION DES LANGUES =====
let currentLang = 'fr';
const translations = {};

// Détecter la langue du navigateur
function detectBrowserLanguage() {
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['fr', 'en', 'ar', 'ha'];
    
    if (supportedLangs.includes(browserLang)) {
        return browserLang;
    }
    return 'fr';
}

// Charger la langue
async function loadLanguage(lang) {
    try {
        // Charger le fichier JSON de langue
        const response = await fetch(`lang/${lang}.json`);
        translations[lang] = await response.json();
        
        // Appliquer les traductions
        applyTranslations(lang);
        
        // Sauvegarder la préférence
        localStorage.setItem('preferredLang', lang);
        
        // Mettre à jour le sélecteur
        updateLanguageSelector(lang);
        
        // Appliquer la direction RTL pour l'arabe
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = lang;
        }
        
        currentLang = lang;
        console.log(`Langue chargée: ${lang}`);
    } catch (error) {
        console.error(`Erreur de chargement de la langue ${lang}:`, error);
        if (lang !== 'fr') {
            loadLanguage('fr');
        }
    }
}

// Appliquer les traductions
function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;
    
    // Fonction pour traduire les textes
    function translateText(selector, text) {
        const elements = document.querySelectorAll(`[data-i18n="${selector}"]`);
        elements.forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        });
    }
    
    // Fonction pour traduire les attributs de placeholder
    function translatePlaceholder(selector, text) {
        const elements = document.querySelectorAll(`[data-i18n-placeholder="${selector}"]`);
        elements.forEach(el => {
            el.placeholder = text;
        });
    }
    
    // Titre de la page
    document.title = t.site.title || 'AG Sutura Couture';
    
    // Traductions principales
    const translationsMap = {
        // Navigation
        'nav.home': t.nav.home,
        'nav.about': t.nav.about,
        'nav.services': t.nav.services,
        'nav.gallery': t.nav.gallery,
        'nav.contact': t.nav.contact,
        
        // Hero
        'hero.title': t.hero.title,
        'hero.subtitle': t.hero.subtitle,
        'hero.description': t.hero.description,
        'hero.button1': t.hero.button1,
        'hero.button2': t.hero.button2,
        
        // À propos
        'about.title': t.about.title,
        'about.subtitle': t.about.subtitle,
        'about.description': t.about.description,
        'about.values.excellence': t.about.values.excellence,
        'about.values.excellence_desc': t.about.values.excellence_desc,
        'about.values.passion': t.about.values.passion,
        'about.values.passion_desc': t.about.values.passion_desc,
        'about.values.elegance': t.about.values.elegance,
        'about.values.elegance_desc': t.about.values.elegance_desc,
        'about.commitment': t.about.commitment,
        'about.commitment_items0': t.about.commitment_items[0],
        'about.commitment_items1': t.about.commitment_items[1],
        'about.commitment_items2': t.about.commitment_items[2],
        'about.commitment_items3': t.about.commitment_items[3],
        
        // Services
        'services.title': t.services.title,
        'services.subtitle': t.services.subtitle,
        'services.custom.title': t.services.custom.title,
        'services.custom.description': t.services.custom.description,
        'services.custom.items0': t.services.custom.items[0],
        'services.custom.items1': t.services.custom.items[1],
        'services.custom.items2': t.services.custom.items[2],
        'services.custom.items3': t.services.custom.items[3],
        'services.alterations.title': t.services.alterations.title,
        'services.alterations.description': t.services.alterations.description,
        'services.alterations.items0': t.services.alterations.items[0],
        'services.alterations.items1': t.services.alterations.items[1],
        'services.alterations.items2': t.services.alterations.items[2],
        'services.alterations.items3': t.services.alterations.items[3],
        'services.traditional.title': t.services.traditional.title,
        'services.traditional.description': t.services.traditional.description,
        'services.traditional.items0': t.services.traditional.items[0],
        'services.traditional.items1': t.services.traditional.items[1],
        'services.traditional.items2': t.services.traditional.items[2],
        'services.traditional.items3': t.services.traditional.items[3],
        'services.professional.title': t.services.professional.title,
        'services.professional.description': t.services.professional.description,
        'services.professional.items0': t.services.professional.items[0],
        'services.professional.items1': t.services.professional.items[1],
        'services.professional.items2': t.services.professional.items[2],
        'services.professional.items3': t.services.professional.items[3],
        'services.quote': t.services.quote,
        'services.quote_button': t.services.quote_button,
        
        // Galerie
        'gallery.title': t.gallery.title,
        'gallery.subtitle': t.gallery.subtitle,
        'gallery.filters.all': t.gallery.filters.all,
        'gallery.filters.traditional': t.gallery.filters.traditional,
        'gallery.filters.modern': t.gallery.filters.modern,
        'gallery.filters.custom': t.gallery.filters.custom,
        'gallery.cta': t.gallery.cta,
        'gallery.cta_button': t.gallery.cta_button,
        
        // Contact
        'contact.title': t.contact.title,
        'contact.subtitle': t.contact.subtitle,
        'contact.location': t.contact.location,
        'contact.address': t.contact.address,
        'contact.country': t.contact.country,
        'contact.phone': t.contact.phone,
        'contact.phone_number': t.contact.phone_number,
        'contact.hours': t.contact.hours,
        'contact.whatsapp': t.contact.whatsapp,
        'contact.whatsapp_desc': t.contact.whatsapp_desc,
        'contact.schedule': t.contact.schedule,
        'contact.schedule_days': t.contact.schedule_days,
        'contact.schedule_hours': t.contact.schedule_hours,
        'contact.schedule_sunday': t.contact.schedule_sunday,
        'contact.form_title': t.contact.form_title,
        'contact.form_button': t.contact.form_button,
        
        // Footer
        'footer.title': t.footer.title,
        'footer.slogan': t.footer.slogan,
        'footer.description': t.footer.description,
        'footer.quick_links': t.footer.quick_links,
        'footer.our_services': t.footer.our_services,
        'footer.copyright': t.footer.copyright,
        'footer.made_with': t.footer.made_with,
        
        // Général
        'whatsapp': t.whatsapp,
        'appointment': t.appointment,
        'see_works': t.see_works
    };
    
    // Appliquer toutes les traductions
    Object.entries(translationsMap).forEach(([key, value]) => {
        translateText(key, value);
    });
    
    // Traduire les placeholders
    if (t.contact) {
        translatePlaceholder('contact.form_name', t.contact.form_name);
        translatePlaceholder('contact.form_phone', t.contact.form_phone);
        translatePlaceholder('contact.form_email', t.contact.form_email);
        translatePlaceholder('contact.form_message', t.contact.form_message);
    }
    
    // Mettre à jour les options du select
    const serviceSelect = document.getElementById('service');
    if (serviceSelect && t.contact && t.contact.form_service_options) {
        // Sauvegarder la valeur sélectionnée
        const selectedValue = serviceSelect.value;
        
        // Mettre à jour les options
        serviceSelect.innerHTML = `
            <option value="">${t.contact.form_service || 'Type de service souhaité'}</option>
            <option value="sur-mesure">${t.contact.form_service_options[0] || 'Couture sur mesure'}</option>
            <option value="retouches">${t.contact.form_service_options[1] || 'Retouches'}</option>
            <option value="traditionnel">${t.contact.form_service_options[2] || 'Tenue traditionnelle'}</option>
            <option value="moderne">${t.contact.form_service_options[3] || 'Tenue moderne'}</option>
            <option value="uniforme">${t.contact.form_service_options[4] || 'Uniforme professionnel'}</option>
            <option value="autre">${t.contact.form_service_options[5] || 'Autre'}</option>
        `;
        
        // Restaurer la valeur sélectionnée
        serviceSelect.value = selectedValue;
    }
}

// Mettre à jour le sélecteur de langue
function updateLanguageSelector(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// ===== FONCTIONS UTILITAIRES =====
function getWhatsAppMessage(data, lang) {
    const messages = {
        'fr': `Bonjour AG Sutura Couture !%0A%0A*Nouvelle demande de rendez-vous*%0A%0A👤 *Nom :* ${data.name}%0A📞 *Téléphone :* ${data.phone}%0A📧 *Email :* ${data.email || 'Non fourni'}%0A✂️ *Service :* ${data.service}%0A💬 *Message :* ${data.message || 'Aucun message supplémentaire'}%0A%0AJe souhaite prendre rendez-vous.`,
        'en': `Hello AG Sutura Couture!%0A%0A*New appointment request*%0A%0A👤 *Name :* ${data.name}%0A📞 *Phone :* ${data.phone}%0A📧 *Email :* ${data.email || 'Not provided'}%0A✂️ *Service :* ${data.service}%0A💬 *Message :* ${data.message || 'No additional message'}%0A%0AI would like to make an appointment.`,
        'ar': `مرحباً AG سوترا كوتور!%0A%0A*طلب موعد جديد*%0A%0A👤 *الاسم :* ${data.name}%0A📞 *الهاتف :* ${data.phone}%0A📧 *البريد الإلكتروني :* ${data.email || 'غير متوفر'}%0A✂️ *الخدمة :* ${data.service}%0A💬 *الرسالة :* ${data.message || 'لا توجد رسالة إضافية'}%0A%0Aأرغب في حجز موعد.`,
        'ha': `Sannu AG Sutura Couture!%0A%0A*Sabon buƙatar alƙawari*%0A%0A👤 *Sunan :* ${data.name}%0A📞 *Wayar tarho :* ${data.phone}%0A📧 *Imel :* ${data.email || 'Ba a bayar ba'}%0A✂️ *Sabis :* ${data.service}%0A💬 *Saƙo :* ${data.message || 'Babu ƙarin saƙo'}%0A%0AIna son yin alƙawari.`
    };
    
    return messages[lang] || messages['fr'];
}

function getServiceName(serviceKey, lang) {
    const services = {
        'sur-mesure': { fr: 'Couture sur mesure', en: 'Custom Tailoring', ar: 'خياطة حسب الطلب', ha: 'Dinki na musamman' },
        'retouches': { fr: 'Retouches', en: 'Alterations', ar: 'تعديلات', ha: 'Gyare-gyare' },
        'traditionnel': { fr: 'Tenue traditionnelle', en: 'Traditional Outfit', ar: 'ملابس تقليدية', ha: 'Tufafin gargajiya' },
        'moderne': { fr: 'Tenue moderne', en: 'Modern Outfit', ar: 'ملابس عصرية', ha: 'Tufafin zamani' },
        'uniforme': { fr: 'Uniforme professionnel', en: 'Professional Uniform', ar: 'زي مهني', ha: 'Rigar sana\'a' },
        'autre': { fr: 'Autre service', en: 'Other service', ar: 'خدمة أخرى', ha: 'Wani sabis' }
    };
    
    return services[serviceKey] ? services[serviceKey][lang] || services[serviceKey]['fr'] : serviceKey;
}

function getConfirmationMessage(lang) {
    const messages = {
        'fr': 'Merci ! Redirection vers WhatsApp pour confirmer votre rendez-vous.',
        'en': 'Thank you! Redirecting to WhatsApp to confirm your appointment.',
        'ar': 'شكراً لك! يتم التوجيه إلى واتساب لتأكيد موعدك.',
        'ha': 'Na gode! Ana tura zuwa WhatsApp don tabbatar da alƙawarinku.'
    };
    
    return messages[lang] || messages['fr'];
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // ===== CHARGEMENT DE LA LANGUE =====
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = detectBrowserLanguage();
    
    // Déterminer la langue à charger
    let langToLoad = 'fr';
    if (savedLang && ['fr', 'en', 'ar', 'ha'].includes(savedLang)) {
        langToLoad = savedLang;
    } else if (browserLang) {
        langToLoad = browserLang;
    }
    
    // Charger la langue
    loadLanguage(langToLoad);
    
    // ===== GESTIONNAIRE DES BOUTONS DE LANGUE =====
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                loadLanguage(lang);
            }
        });
    });
    
    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('.menu-toggle')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // ===== GALERIE =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== FORMULAIRE DE CONTACT =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation basique
            if (!name || !phone) {
                alert(currentLang === 'fr' ? 'Veuillez remplir au moins le nom et le téléphone.' :
                      currentLang === 'en' ? 'Please fill at least name and phone.' :
                      currentLang === 'ar' ? 'يرجى ملء الاسم والهاتف على الأقل.' :
                      'Don Allah a cika aƙalla suna da wayar tarho.');
                return;
            }
            
            // Récupérer le nom du service dans la langue courante
            const serviceName = getServiceName(service, currentLang);
            
            // Construire les données
            const formData = {
                name: name,
                phone: phone,
                email: email,
                service: serviceName,
                message: message
            };
            
            // Construire le message WhatsApp
            const whatsappMessage = getWhatsAppMessage(formData, currentLang);
            
            // Numéro WhatsApp - À MODIFIER AVEC TON VRAI NUMÉRO
            const whatsappNumber = '227XXXXXXXXX'; // REMPLACE PAR TON NUMÉRO
            
            // Ouvrir WhatsApp avec le message pré-rempli
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
            // Afficher un message de confirmation
            alert(getConfirmationMessage(currentLang));
        });
    }
    
    // ===== ANIMATIONS AU SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.service-card, .gallery-item, .info-card').forEach(el => {
        observer.observe(el);
    });
    
    // ===== HEADER AU SCROLL =====
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // ===== ANNÉE COURANTE DANS LE FOOTER =====
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = currentYear;
    });
    
    // ===== GESTION DES IMAGES MANQUANTES =====
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent.classList.contains('gallery-image') || 
                parent.classList.contains('hero-image') || 
                parent.classList.contains('about-image')) {
                parent.innerHTML = `
                    <div class="image-fallback">
                        <i class="fas fa-tshirt"></i>
                        <p>${currentLang === 'fr' ? 'Image à venir' : 
                             currentLang === 'en' ? 'Image coming soon' :
                             currentLang === 'ar' ? 'الصورة قريباً' :
                             'Hotona na zuwa'}</p>
                    </div>
                `;
            }
        });
    });
    
    // ===== TOOLTIP POUR WHATSAPP FLOAT =====
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.title = currentLang === 'fr' ? 'Contactez-nous sur WhatsApp' :
                             currentLang === 'en' ? 'Contact us on WhatsApp' :
                             currentLang === 'ar' ? 'اتصل بنا على واتساب' :
                             'Tuntuɓe mu akan WhatsApp';
    }
});

// ===== FONCTION POUR CHANGER LA LANGUE DEPUIS L'EXTÉRIEUR =====
window.changeLanguage = function(lang) {
    if (['fr', 'en', 'ar', 'ha'].includes(lang)) {
        loadLanguage(lang);
    }
};