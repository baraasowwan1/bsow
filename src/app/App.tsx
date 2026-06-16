import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router";
import {
  Globe, Search, MapPin, Megaphone, Menu, X, ArrowRight,
  MessageCircle, Mail, Phone, CheckCircle, Zap, Shield,
  Star, Clock, ChevronRight, TrendingUp, Users, Award, Code2, Terminal,
  Home, Layers, Info, MessageSquare,
} from "lucide-react";

type Lang = "ar" | "en";
type Page = "home" | "services" | "about" | "contact";

const WA_NUMBER = "962790082373";
const PHONE_DISPLAY = "+962 79 0082 373";
const FB_URL = "https://www.facebook.com/sowwanjo";
const IG_URL = "https://www.instagram.com/sowwanjo/";
const BRAND = "SOWWAN";

// ── Dracula / VS Code Programming Palette ───────────────────────────────────
const C = {
  purple:  '#cba6f7',  // Dracula mauve/purple
  cyan:    '#89dceb',  // Dracula sky/cyan
  green:   '#a6e3a1',  // Dracula green  
  pink:    '#f38ba8',  // Dracula red/pink
  orange:  '#fab387',  // Dracula peach/orange
  yellow:  '#f9e2af',  // Dracula yellow
  muted:   '#6c7086',  // Dracula overlay1
};
const GRAD_MAIN   = 'linear-gradient(135deg, #cba6f7 0%, #89dceb 100%)';
const GRAD_PURPLE = 'linear-gradient(135deg, #cba6f7 0%, #b4befe 100%)';
const GRAD_CHROME = 'linear-gradient(135deg, #cba6f7, #89dceb, #a6e3a1, #cba6f7)';
const GRAD_GOLD   = GRAD_MAIN;
const SERVICE_COLORS = [C.purple, C.cyan, C.green, C.orange];
const SERVICE_ICONS = [Globe, Search, MapPin, Megaphone];

// ── Global Styles — Peach Dark ───────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes bokehDrift {
    0%,100% { transform: translate(0,0) scale(1); }
    33%  { transform: translate(30px,-22px) scale(1.08); }
    66%  { transform: translate(-22px,16px) scale(0.94); }
  }
  @keyframes purpleSweep {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }
  @keyframes codeFloat {
    0%   { transform: translateY(0); opacity: 0; }
    8%   { opacity: 0.7; }
    92%  { opacity: 0.4; }
    100% { transform: translateY(-120vh); opacity: 0; }
  }
  @keyframes scanLine {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes techPulse {
    0%,100% { opacity:.5; }
    50%     { opacity:1; }
  }

  /* ── Animated purple gradient headline ── */
  .gold-text {
    background: linear-gradient(135deg, #cba6f7, #89dceb, #a6e3a1, #f38ba8, #cba6f7);
    background-size: 300% 300%;
    animation: purpleSweep 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 22px rgba(203,166,247,0.6)) drop-shadow(0 0 45px rgba(137,220,235,0.3));
  }

  /* ── Dark glass surface ── */
  .gloss-surface {
    position: relative;
    overflow: hidden;
    background: linear-gradient(160deg, rgba(203,166,247,0.08) 0%, rgba(255,255,255,0.02) 40%, rgba(5,5,8,0.95) 100%);
    border: 1px solid rgba(203,166,247,0.2);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.07),
      inset 0 -1px 0 rgba(0,0,0,0.6),
      0 20px 60px rgba(0,0,0,0.65),
      0 4px 20px rgba(0,0,0,0.45);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    transition: border-color .4s, box-shadow .4s;
  }
  .gloss-surface::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 45%;
    background: linear-gradient(180deg, rgba(203,166,247,0.09) 0%, transparent 100%);
    pointer-events: none; z-index: 1;
  }
  .gloss-surface:hover {
    border-color: rgba(203,166,247,0.5);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 0 40px rgba(203,166,247,0.22),
      0 0 80px rgba(137,220,235,0.12),
      0 24px 70px rgba(0,0,0,0.7);
  }

  /* ── Primary purple gradient button ── */
  .gold-btn {
    background: linear-gradient(135deg, #cba6f7 0%, #89dceb 100%);
    background-size: 200% 200%;
    animation: purpleSweep 4s ease infinite;
    border: 1px solid rgba(255,255,255,0.18);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.22),
      0 0 30px rgba(203,166,247,0.55),
      0 0 60px rgba(137,220,235,0.25),
      0 8px 28px rgba(0,0,0,0.5);
    color: #fff; font-weight: 800;
    transition: transform .22s ease, box-shadow .22s ease;
    position: relative; overflow: hidden;
  }
  .gold-btn::before {
    content: ''; position: absolute; top: 0; left: -60%;
    width: 45%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: skewX(-18deg); transition: left .55s ease;
  }
  .gold-btn:hover { transform: translateY(-3px) scale(1.02); }
  .gold-btn:hover::before { left: 140%; }
  .gold-btn:hover {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.28),
      0 0 55px rgba(203,166,247,0.75),
      0 0 110px rgba(166,227,161,0.35),
      0 14px 36px rgba(0,0,0,0.55);
  }

  /* ── Outline ghost button ── */
  .outline-btn {
    background: rgba(203,166,247,0.07);
    border: 1px solid rgba(203,166,247,0.35);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
    color: #cdd6f4; font-weight: 700;
    transition: all .25s ease;
  }
  .outline-btn:hover {
    border-color: rgba(203,166,247,0.65);
    background: rgba(203,166,247,0.15);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 0 30px rgba(203,166,247,0.3);
    transform: translateY(-2px);
  }

  /* ── Ripple click effect ── */
  @keyframes ripple-expand {
    to { transform: scale(4); opacity: 0; }
  }
  .ripple-btn {
    position: relative;
    overflow: hidden;
  }
  .ripple-btn .ripple-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    transform: scale(0);
    animation: ripple-expand 0.55s linear;
    pointer-events: none;
  }

  /* ── Scramble text reveal ── */
  .scramble-text {
    font-variant-numeric: tabular-nums;
    letter-spacing: 0;
  }

  /* ── Magnetic button wrapper ── */
  .magnetic-wrap {
    display: inline-flex;
    transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0f0f17; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#cba6f7, #89dceb); border-radius: 4px; }
`;

// ── Social Icons ──────────────────────────────────────────────────────────────
const FbSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IgSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const WaSvg = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.089.534 4.055 1.47 5.765L0 24l6.445-1.44A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-5.031-1.388l-.36-.214-3.724.832.848-3.626-.235-.372A9.778 9.778 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
  </svg>
);

// ── Translations ──────────────────────────────────────────────────────────────
const T = {
  ar: {
    dir: "rtl" as const,
    navItems: [
      { key: "home" as Page, label: "الرئيسية" },
      { key: "services" as Page, label: "خدماتنا" },
      { key: "about" as Page, label: "من نحن" },
      { key: "contact" as Page, label: "تواصل معنا" },
    ],
    langBtn: "EN",
    contactBtn: "تواصل معنا",
    waFloat: "تواصل عبر واتساب",
    hero: {
      badge: "وكالة رقمية متكاملة — الأردن",
      terminalLine: "$ sowwan --build your-digital-future",
      line1: "نُحوِّل رؤيتك",
      line2: "إلى واقع رقمي",
      sub: "نصمم تجارب رقمية استثنائية تُحوِّل زوارك إلى عملاء وتُنمِّي أعمالك بشكل مستدام ومقاس",
      cta: "ابدأ مشروعك الآن",
      cta2: "اكتشف خدماتنا",
      scrollText: "اكتشف المزيد",
    },
    ticker: ["تصميم مواقع احترافية", "تحسين محركات البحث", "توثيق خرائط جوجل", "إدارة السوشال ميديا", "إعلانات مدفوعة", "هويات بصرية", "تسويق رقمي", "حلول رقمية متكاملة"],
    stats: [
      { num: 600, suffix: "+", label: "عميل راضٍ", icon: Users },
      { num: 320, suffix: "+", label: "مشروع منجز", icon: Award },
      { num: 12, suffix: "+", label: "سنوات خبرة", icon: Clock },
      { num: 100, suffix: "%", label: "نسبة الرضا", icon: TrendingUp },
    ],
    services: {
      badge: "ما نقدمه",
      title: "خدماتنا",
      sub: "حلول رقمية متكاملة مصممة لتنمية أعمالك وتعزيز حضورك الرقمي",
      learnMore: "اعرف المزيد",
      items: [
        {
          title: "تصميم موقع ويب",
          short: "مواقع سريعة واحترافية",
          desc: "نبني مواقع ويب احترافية وسريعة تعكس هوية علامتك التجارية بالكامل، مُحسَّنة لمحركات البحث ومتجاوبة مع جميع الأجهزة لتقديم أفضل تجربة للزائر.",
          features: ["تصميم مخصص بالكامل", "سرعة تحميل فائقة", "متجاوب مع الموبايل", "SEO مدمج من البداية", "لوحة تحكم سهلة", "شهادة SSL مجانية"],
          stat: "98%", statLabel: "معدل رضا العملاء",
        },
        {
          title: "تحسين محركات البحث",
          short: "صدارة نتائج جوجل",
          desc: "نضع موقعك في صدارة نتائج جوجل ومحركات البحث باستراتيجيات SEO متقدمة ومثبتة، مع تقارير شهرية شفافة لمتابعة التحسن المستمر في ترتيبك.",
          features: ["تحليل شامل للكلمات المفتاحية", "بناء روابط خارجية قوية", "تحسين المحتوى الداخلي", "SEO تقني متقدم", "تقارير شهرية مفصلة", "متابعة المنافسين"],
          stat: "3x", statLabel: "متوسط زيادة الزيارات",
        },
        {
          title: "توثيق خرائط جوجل",
          short: "حضور محلي قوي",
          desc: "نُثبِّت حضورك الرسمي على خرائط جوجل ونُحسِّن ملفك التجاري لتظهر في أعلى نتائج البحث المحلي وتجذب المزيد من العملاء القريبين منك.",
          features: ["توثيق رسمي سريع", "إدارة وتحسين التقييمات", "تحسين بروفايل الأعمال", "صور وفيديوهات احترافية", "إضافة ساعات العمل", "ظهور في Maps وSearch"],
          stat: "5x", statLabel: "زيادة الظهور المحلي",
        },
        {
          title: "إدارة السوشال ميديا",
          short: "محتوى يصنع الفرق",
          desc: "نُدير منصاتك على فيسبوك وإنستغرام وغيرها بمحتوى إبداعي مدروس وإعلانات مستهدفة دقيقة تبني جمهوراً حقيقياً وتُحقق نتائج قابلة للقياس.",
          features: ["محتوى إبداعي يومي", "إدارة إعلانات Meta & TikTok", "تحليل أداء مفصل", "تفاعل مستمر مع الجمهور", "استراتيجية محتوى شهرية", "تقارير أداء أسبوعية"],
          stat: "4x", statLabel: "متوسط زيادة التفاعل",
        },
      ],
    },
    features: {
      badge: "لماذا SOWWAN",
      title: "ما يُميِّزنا",
      sub: "نجمع بين الإبداع والخبرة التقنية والشفافية الكاملة لتقديم نتائج حقيقية وقابلة للقياس",
      items: [
        { icon: Zap, color: C.purple, title: "تسليم سريع وفي الموعد", desc: "نلتزم بالمواعيد المتفق عليها دون تأخير مع مرونة في التعديلات والمراجعات" },
        { icon: Shield, color: C.cyan, title: "جودة مضمونة 100%", desc: "نلتزم بأعلى معايير الجودة التقنية في كل تفصيلة من تفاصيل مشروعك" },
        { icon: Code2, color: C.pink, title: "تقنيات عصرية متقدمة", desc: "نستخدم أحدث التقنيات والأدوات في عالم البرمجة والتسويق الرقمي" },
        { icon: Clock, color: C.purple, title: "دعم فني 24/7", desc: "فريقنا متاح دائماً للإجابة على استفساراتك وحل أي مشكلة في أسرع وقت" },
        { icon: TrendingUp, color: C.purple, title: "نتائج قابلة للقياس", desc: "كل خدمة نقدمها مرتبطة بمؤشرات أداء واضحة تقيس نمو أعمالك فعلياً" },
        { icon: Terminal, color: C.cyan, title: "حلول مبنية على البيانات", desc: "قراراتنا مدعومة بالتحليلات والبيانات لضمان أفضل النتائج لك" },
      ],
    },
    process: {
      badge: "كيف نعمل",
      title: "رحلتك معنا",
      sub: "عملية واضحة وشفافة من أول كلمة حتى الإطلاق والنمو",
      steps: [
        { num: "01", title: "الاستماع والفهم", desc: "نجلس معك لفهم أهدافك وتحديات أعمالك ورؤيتك بعمق قبل أي خطوة" },
        { num: "02", title: "الاستراتيجية والتخطيط", desc: "نضع خطة عمل متكاملة ومخصصة لأهدافك مع جدول زمني واضح ومُتفق عليه" },
        { num: "03", title: "التصميم والتطوير", desc: "ننفذ المشروع باحترافية عالية مع تقارير دورية وفرص للمراجعة في كل مرحلة" },
        { num: "04", title: "الإطلاق والنمو المستمر", desc: "نطلق مشروعك ونتابعه باستمرار لضمان أفضل النتائج وتحسين مستمر لا ينتهي" },
      ],
    },
    about: {
      badge: "قصتنا",
      title: "من نحن",
      sub: "شريكك التقني الموثوق في التحول الرقمي",
      p1: "SOWWAN وكالة رقمية متكاملة مقرها الأردن، وُلدت من شغف حقيقي بالتكنولوجيا والإبداع الرقمي. نجمع بين الخبرة التقنية العميقة والحس الإبداعي لبناء حضور رقمي قوي ومؤثر يُحقق أهداف أعمالك.",
      p2: "منذ تأسيسنا، خدمنا عشرات الشركات والأفراد الطموحين في رحلتهم نحو النجاح الرقمي، مع التزام راسخ بالجودة والشفافية والمواعيد في كل مشروع نتولاه.",
      values: ["الجودة التقنية فوق كل اعتبار", "شفافية تامة في كل خطوة", "التزام حديدي بالمواعيد", "ابتكار تقني مستمر بلا حدود"],
      imgAlt: "فريق SOWWAN",
      teamLabel: "فريق تقني محترف",
      teamSub: "مهندسون ومصممون ومسوّقون يعملون معاً",
    },
    contact: {
      badge: "ابدأ اليوم",
      title: "تواصل معنا",
      sub: "استشارة مجانية — نحن هنا لسماعك ومساعدتك في بناء مستقبلك الرقمي",
      namePh: "الاسم الكامل *",
      emailPh: "البريد الإلكتروني *",
      phonePh: "رقم الهاتف",
      servicePh: "اختر الخدمة المطلوبة",
      msgPh: "أخبرنا عن مشروعك وأهدافك...",
      send: "أرسل رسالتك",
      success: "شكراً جزيلاً! تلقّينا رسالتك وسيتواصل معك فريقنا خلال 24 ساعة.",
      opts: ["تصميم موقع ويب", "تحسين محركات البحث (SEO)", "توثيق خرائط جوجل", "إدارة السوشال ميديا والإعلانات", "جميع الخدمات"],
      waBtn: "تحدث معنا مباشرة على واتساب",
      infoItems: [
        { icon: "wa", label: "واتساب وهاتف", value: PHONE_DISPLAY },
        { icon: "ig", label: "إنستغرام", value: "@sowwanjo" },
        { icon: "fb", label: "فيسبوك", value: "sowwanjo" },
      ],
      hours: "أوقات العمل",
      weekdays: "الأحد — الخميس", weekdaysH: "9:00 ص – 6:00 م",
      sat: "السبت", satH: "10:00 ص – 3:00 م",
      fri: "الجمعة", friH: "مغلق",
    },
    footer: {
      tagline: "نُحوِّل رؤيتك إلى واقع رقمي",
      rights: "جميع الحقوق محفوظة",
      madeIn: "صُنع في الأردن 🇯🇴",
      links: ["الرئيسية", "خدماتنا", "من نحن", "تواصل معنا"],
      linksKeys: ["home", "services", "about", "contact"] as Page[],
      contactTitle: "للتواصل",
    },
  },
  en: {
    dir: "ltr" as const,
    navItems: [
      { key: "home" as Page, label: "Home" },
      { key: "services" as Page, label: "Services" },
      { key: "about" as Page, label: "About" },
      { key: "contact" as Page, label: "Contact" },
    ],
    langBtn: "عربي",
    contactBtn: "Contact Us",
    waFloat: "Chat on WhatsApp",
    hero: {
      badge: "Full-Service Digital Agency — Jordan",
      terminalLine: "$ sowwan --build your-digital-future",
      line1: "We Transform",
      line2: "Your Digital Vision",
      sub: "We craft exceptional digital experiences that convert visitors into loyal customers and grow your business sustainably",
      cta: "Start Your Project",
      cta2: "Explore Services",
      scrollText: "Scroll to explore",
    },
    ticker: ["Professional Web Design", "SEO Optimization", "Google Maps Verification", "Social Media Management", "Paid Advertising", "Visual Identity", "Digital Marketing", "Full Digital Solutions"],
    stats: [
      { num: 600, suffix: "+", label: "Happy Clients", icon: Users },
      { num: 320, suffix: "+", label: "Projects Done", icon: Award },
      { num: 12, suffix: "+", label: "Years Experience", icon: Clock },
      { num: 100, suffix: "%", label: "Satisfaction Rate", icon: TrendingUp },
    ],
    services: {
      badge: "What We Offer",
      title: "Our Services",
      sub: "Comprehensive digital solutions designed to grow your business and enhance your digital presence",
      learnMore: "Learn More",
      items: [
        {
          title: "Web Design",
          short: "Fast & professional websites",
          desc: "We build professional, fast websites that fully reflect your brand identity, optimized for search engines and responsive on all devices.",
          features: ["Fully custom design", "Superior loading speed", "Mobile responsive", "Built-in SEO", "Easy control panel", "Free SSL certificate"],
          stat: "98%", statLabel: "Client satisfaction",
        },
        {
          title: "SEO Optimization",
          short: "Top of Google results",
          desc: "We rank your website at the top of Google and search engine results with advanced, proven SEO strategies and monthly reports.",
          features: ["Keyword analysis", "Strong backlink building", "Content optimization", "Advanced technical SEO", "Monthly reports", "Competitor monitoring"],
          stat: "3x", statLabel: "Average traffic increase",
        },
        {
          title: "Google Maps Verification",
          short: "Strong local presence",
          desc: "We establish your official presence on Google Maps and optimize your business profile to appear at the top of local search results.",
          features: ["Quick official verification", "Review management", "Profile optimization", "Professional photos", "Working hours setup", "Maps & Search visibility"],
          stat: "5x", statLabel: "Local visibility increase",
        },
        {
          title: "Social Media Management",
          short: "Content that makes a difference",
          desc: "We manage your platforms with creative, strategic content and targeted ads that build a real audience and deliver measurable results.",
          features: ["Daily creative content", "Meta & TikTok ad management", "Performance analytics", "Audience engagement", "Monthly content strategy", "Weekly performance reports"],
          stat: "4x", statLabel: "Engagement increase",
        },
      ],
    },
    features: {
      badge: "Why SOWWAN",
      title: "What Sets Us Apart",
      sub: "Combining creativity, technical expertise, and full transparency to deliver real, measurable results",
      items: [
        { icon: Zap, color: C.purple, title: "Fast & On-Time Delivery", desc: "We commit to agreed deadlines without delays, with flexibility for revisions" },
        { icon: Shield, color: C.cyan, title: "100% Guaranteed Quality", desc: "We commit to the highest technical quality standards in every project detail" },
        { icon: Code2, color: C.pink, title: "Advanced Modern Technologies", desc: "We use the latest technologies and tools in programming and digital marketing" },
        { icon: Clock, color: C.purple, title: "24/7 Technical Support", desc: "Our team is always available to answer your questions and resolve issues quickly" },
        { icon: TrendingUp, color: C.purple, title: "Measurable Results", desc: "Every service is tied to clear KPIs that measure your actual business growth" },
        { icon: Terminal, color: C.cyan, title: "Data-Driven Solutions", desc: "Our decisions are backed by analytics and data to ensure the best results for you" },
      ],
    },
    process: {
      badge: "How We Work",
      title: "Your Journey With Us",
      sub: "A clear and transparent process from the first word to launch and growth",
      steps: [
        { num: "01", title: "Listen & Understand", desc: "We deeply understand your goals and business challenges before any step" },
        { num: "02", title: "Strategy & Planning", desc: "We create a comprehensive plan tailored to your goals with a clear timeline" },
        { num: "03", title: "Design & Development", desc: "We execute with high professionalism with periodic reports at each stage" },
        { num: "04", title: "Launch & Continuous Growth", desc: "We launch and continuously monitor your project for the best results" },
      ],
    },
    about: {
      badge: "Our Story",
      title: "About SOWWAN",
      sub: "Your Trusted Technical Partner in Digital Transformation",
      p1: "SOWWAN is a full-service digital agency based in Jordan, born from a genuine passion for technology and digital creativity. We combine deep technical expertise with creative vision to build a powerful digital presence.",
      p2: "Since our founding, we have served dozens of ambitious companies on their digital success journey, with a firm commitment to quality, transparency, and deadlines in every project.",
      values: ["Technical Quality Above All", "Full Transparency at Every Step", "Iron Commitment to Deadlines", "Boundless Technical Innovation"],
      imgAlt: "SOWWAN Team",
      teamLabel: "Professional Technical Team",
      teamSub: "Engineers, designers & marketers working together",
    },
    contact: {
      badge: "Start Today",
      title: "Contact Us",
      sub: "Free consultation — we're here to help you build your digital future",
      namePh: "Full Name *",
      emailPh: "Email Address *",
      phonePh: "Phone Number",
      servicePh: "Choose required service",
      msgPh: "Tell us about your project and goals...",
      send: "Send Your Message",
      success: "Thank you! We received your message and will contact you within 24 hours.",
      opts: ["Web Design", "SEO Optimization", "Google Maps Verification", "Social Media Management & Ads", "All Services"],
      waBtn: "Chat with us directly on WhatsApp",
      infoItems: [
        { icon: "wa", label: "WhatsApp & Phone", value: PHONE_DISPLAY },
        { icon: "ig", label: "Instagram", value: "@sowwanjo" },
        { icon: "fb", label: "Facebook", value: "sowwanjo" },
      ],
      hours: "Working Hours",
      weekdays: "Sunday — Thursday", weekdaysH: "9:00 AM – 6:00 PM",
      sat: "Saturday", satH: "10:00 AM – 3:00 PM",
      fri: "Friday", friH: "Closed",
    },
    footer: {
      tagline: "Transforming your vision into digital reality",
      rights: "All Rights Reserved",
      madeIn: "Made in Jordan 🇯🇴",
      links: ["Home", "Services", "About", "Contact"],
      linksKeys: ["home", "services", "about", "contact"] as Page[],
      contactTitle: "Get In Touch",
    },
  },
};

// ── Custom Hooks ──────────────────────────────────────────────────────────────
function useCounter(end: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, end, duration]);
  return { count, ref };
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const m = document.documentElement.scrollHeight - window.innerHeight; setP(m > 0 ? window.scrollY / m : 0); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}


// ── Canvas Particle Network (fast — single canvas, no motion overhead) ────────
function CanvasBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, raf = 0;

    const COLORS = ["#cba6f7","#89dceb","#a6e3a1","#f38ba8","#fab387"];
    type Node = { x:number; y:number; vx:number; vy:number; r:number; c:string };
    let nodes: Node[] = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      nodes = Array.from({ length: 70 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(203,166,247,${0.12*(1-d/130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      // dots
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = W; else if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; else if (n.y > H) n.y = 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle = n.c + "99";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55 }} />
  );
}

// ── 3D Floating Code Editor ───────────────────────────────────────────────────
const CODE_CONTENT = [
  { t:"comment", v:"// SOWWAN Digital Agency — الأردن" },
  { t:"blank",   v:"" },
  { t:"line",    v:'const ', k:"services", r:" = {" },
  { t:"prop",    v:'  webDesign', r:': "تصميم مواقع",' },
  { t:"prop",    v:'  seoRank', r:':   "تحسين SEO",' },
  { t:"prop",    v:'  googleMaps', r:': "خرائط جوجل",' },
  { t:"prop",    v:'  socialMedia', r:': "سوشال ميديا"' },
  { t:"bracket", v:"};" },
  { t:"blank",   v:"" },
  { t:"fn",      v:"async ", k:"function", r:" growBusiness(client) {" },
  { t:"indent",  v:"  const result = ", r:"await deploy(client);" },
  { t:"indent",  v:"  return result.success;" },
  { t:"bracket", v:"}" },
];

const SX: Record<string, React.CSSProperties> = {
  comment: { color: "#6272a4", fontStyle: "italic" },
  k:       { color: "#cba6f7" },
  prop:    { color: "#89dceb" },
  fn:      { color: "#a6e3a1" },
  string:  { color: "#f9e2af" },
  bracket: { color: "#cdd6f4" },
  indent:  { color: "#cdd6f4" },
};

function FloatingCodeEditor({ dir }: { dir: "rtl"|"ltr" }) {
  return (
    <div className="hidden lg:flex items-center justify-center w-full h-full"
      style={{ perspective: "1400px" }}>
      <motion.div
        initial={{ opacity: 0, rotateY: dir === "rtl" ? 18 : -18, y: 20 }}
        animate={{ opacity: 1, rotateY: dir === "rtl" ? 14 : -14, y: [0, -14, 0] }}
        transition={{ opacity: { duration: 0.8, delay: 0.5 }, rotateY: { duration: 0.8, delay: 0.5 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
        style={{ transformStyle: "preserve-3d", width: "100%", maxWidth: 440 }}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#21213c", borderBottom: "1px solid rgba(203,166,247,0.1)" }}>
          <div className="flex gap-1.5">
            {["#f38ba8","#fab387","#a6e3a1"].map(c => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="text-xs font-mono ms-2" style={{ color: "#6c7086" }}>sowwan.js — SOWWAN</span>
          <span className="ms-auto text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: "rgba(166,227,161,0.15)", color: "#a6e3a1" }}>● live</span>
        </div>

        {/* Code body */}
        <div className="p-5 font-mono text-[13px] leading-7"
          style={{ background: "#1a1a2e", minHeight: 280 }}>
          {/* Line numbers col + code */}
          {CODE_CONTENT.map((line, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.35 }}
              className="flex items-start gap-4">
              <span style={{ color: "#313244", width: 18, textAlign: "right", flexShrink: 0, userSelect: "none" }}>
                {line.t !== "blank" ? i + 1 : ""}
              </span>
              <span className="flex-1">
                {line.t === "comment" && <span style={SX.comment}>{line.v}</span>}
                {line.t === "blank"   && <span>&nbsp;</span>}
                {line.t === "bracket" && <span style={SX.bracket}>{line.v}</span>}
                {line.t === "line"    && <><span style={SX.k}>{line.v}</span><span style={SX.k}>{line.k}</span><span style={SX.bracket}>{line.r}</span></>}
                {line.t === "prop"    && <><span style={SX.prop}>{line.v}</span><span style={SX.bracket}>{line.r}</span></>}
                {line.t === "fn"      && <><span style={SX.k}>{line.v}</span><span style={SX.k}>{line.k}</span><span style={SX.bracket}>{line.r}</span></>}
                {line.t === "indent"  && <span style={SX.indent}>{line.v}{line.r && <span style={{ color: "#f9e2af" }}>{line.r}</span>}</span>}
              </span>
            </motion.div>
          ))}
          {/* Blinking cursor */}
          <motion.div animate={{ opacity: [1,0,1] }} transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-4 ms-2 align-middle"
            style={{ background: "#cba6f7", borderRadius: 1 }} />
        </div>

        {/* Glow overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(203,166,247,0.06) 0%, transparent 60%)", boxShadow: "0 0 60px rgba(203,166,247,0.15), 0 0 120px rgba(137,220,235,0.08)" }} />
      </motion.div>
    </div>
  );
}

// ── Simple Hero Background (CSS only, no JS overhead) ─────────────────────────
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Canvas particle network */}
      <CanvasBackground />
      {/* Fine dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(rgba(203,166,247,0.12) 1px, transparent 1px)",
        backgroundSize: "48px 48px", opacity: 0.5,
      }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, rgba(15,15,23,0.88) 100%)",
      }} />
      {/* Soft purple glow — upper right */}
      <div style={{ position:"absolute", borderRadius:"50%", width:800, height:800,
        background:"radial-gradient(circle, rgba(203,166,247,0.12) 0%, transparent 65%)",
        top:"-20%", right:"-10%", filter:"blur(80px)", animation:"bokehDrift 18s ease-in-out infinite",
      }} />
      {/* Soft cyan glow — lower left */}
      <div style={{ position:"absolute", borderRadius:"50%", width:600, height:600,
        background:"radial-gradient(circle, rgba(137,220,235,0.1) 0%, transparent 65%)",
        bottom:"-15%", left:"-8%", filter:"blur(90px)", animation:"bokehDrift 22s ease-in-out infinite reverse",
      }} />
    </div>
  );
}

// ── Reusable Components ───────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: 90 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeIn({ children, delay = 0, x = 0, className }: { children: React.ReactNode; delay?: number; x?: number; className?: string }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, x, y: x === 0 ? 24 : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full"
      style={{
        background: "rgba(203,166,247,0.1)",
        color: C.purple,
        border: "1px solid rgba(203,166,247,0.28)",
        boxShadow: "0 0 14px rgba(203,166,247,0.12)",
      }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.purple, boxShadow: `0 0 6px ${C.purple}`, animation:"techPulse 2.5s ease infinite" }} />
      {children}
    </motion.span>
  );
}

function SectionHeader({ badge, title, sub, center = true, goldTitle = false }: {
  badge: string; title: string; sub: string; center?: boolean; goldTitle?: boolean;
}) {
  return (
    <div className={`mb-16 ${center ? "text-center" : ""}`}>
      <div className={center ? "flex justify-center mb-5" : "mb-5"}><Badge>{badge}</Badge></div>
      <Reveal>
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 ${goldTitle ? "gold-text" : ""}`}
          style={goldTitle ? {} : { color: "#ffffff", textShadow: "0 0 30px rgba(255,255,255,0.15)" }}
        >{title}</h2>
      </Reveal>
      <FadeIn delay={0.1}>
        <p className={`text-muted-foreground text-lg leading-relaxed ${center ? "max-w-2xl mx-auto" : "max-w-xl"}`}>{sub}</p>
      </FadeIn>
    </div>
  );
}

function StatCounter({ num, suffix, label }: { num: number; suffix: string; label: string; icon: React.ElementType }) {
  const { count, ref } = useCounter(num);
  return (
    <div ref={ref} className="text-center">
      <div className="flex items-end justify-center gap-0.5 mb-1.5">
        <span className="text-3xl md:text-4xl font-black leading-none" style={{ color: "#cba6f7", textShadow: "0 0 16px rgba(203,166,247,0.5)" }}>{count}</span>
        <span className="text-lg font-black mb-1" style={{ color: "#cba6f7" }}>{suffix}</span>
      </div>
      <div className="text-xs md:text-sm font-semibold" style={{ color: "#6c7086" }}>{label}</div>
    </div>
  );
}

function Ticker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-4" style={{ borderTop: "1px solid rgba(203,166,247,0.15)", borderBottom: "1px solid rgba(203,166,247,0.15)", background: "#1e1e2e" }}>
      <motion.div className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {item}
            <span style={{ color: C.purple, fontSize: 7 }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ item, index, dir, learnMore }: {
  item: (typeof T)["ar"]["services"]["items"][0]; index: number; dir: "rtl" | "ltr"; learnMore: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  const color = SERVICE_COLORS[index];
  const Icon = SERVICE_ICONS[index];
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -15, y: ((e.clientX - r.left) / r.width - 0.5) * 15 });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.1 }}>
      {/* Gradient border */}
      <div style={{
        padding: 1, borderRadius: "1.25rem",
        background: hov ? `linear-gradient(135deg, ${color}, ${color}55, rgba(255,255,255,0.5))` : "rgba(184,137,58,0.1)",
        transition: "background 0.4s, box-shadow 0.4s",
        boxShadow: hov ? `0 0 28px ${color}18, 0 12px 40px rgba(0,0,0,0.1)` : "0 4px 20px rgba(0,0,0,0.05)",
      }}>
        <div ref={ref}
          onMouseMove={onMove}
          onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
          onMouseEnter={() => setHov(true)}
          style={{
            transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.12s ease",
            borderRadius: "calc(1.25rem - 1px)",
          }}
          className="gloss-surface p-8 h-full flex flex-col cursor-default">

          {/* Glow on hover */}
          <motion.div animate={{ opacity: hov ? 1 : 0 }} transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% -10%, ${color}18 0%, transparent 60%)` }} />

          {/* Stat top corner */}
          <div className={`absolute top-6 ${dir === "rtl" ? "left-6" : "right-6"} text-center`}>
            <div className="text-2xl font-black" style={{ color }}>{item.stat}</div>
            <div className="text-[10px] text-muted-foreground leading-tight max-w-[65px]">{item.statLabel}</div>
          </div>

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0"
            style={{ background: `${color}12`, border: `1px solid ${color}30`, boxShadow: `0 0 20px ${color}18` }}>
            <Icon size={26} style={{ color, filter: `drop-shadow(0 0 8px ${color})` }} />
          </div>

          <div className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color, opacity: 0.8 }}>{item.short}</div>
          <h3 className="text-xl font-black text-foreground mb-3">
            <ScrambleText text={item.title} active={hov} />
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{item.desc}</p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-1.5 mb-5">
            {item.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle size={11} style={{ color, flexShrink: 0 }} /> {f}
              </div>
            ))}
          </div>

          <motion.div animate={{ opacity: hov ? 1 : 0.4, x: hov ? 0 : (dir === "rtl" ? 5 : -5) }} transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-sm font-bold" style={{ color }}>
            <span>{learnMore}</span>
            <ArrowRight size={15} className={dir === "rtl" ? "rotate-180" : ""} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ t, lang, setLang, page, setPage }: {
  t: (typeof T)["ar"]; lang: Lang; setLang: (l: Lang) => void; page: Page; setPage: (p: Page) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(15,15,23,0.96)"
          : "rgba(15,15,23,0.4)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: scrolled ? "1px solid rgba(203,166,247,0.15)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(203,166,247,0.08), 0 8px 32px rgba(0,0,0,0.6)" : "none",
      }}>
      <div className="max-w-7xl mx-auto px-5 h-[62px] flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => setPage("home")} className="flex items-center gap-3 flex-shrink-0 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-opacity" style={{ background: GRAD_GOLD }} />
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GRAD_GOLD }}>
              <span className="text-[#03030a] font-black text-base leading-none">S</span>
            </div>
          </div>
          <span className="font-black text-xl tracking-tight gold-text">{BRAND}</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {t.navItems.map((item) => (
            <button key={item.key} onClick={() => setPage(item.key)}
              className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ color: page === item.key ? C.purple : "#6c7086" }}>
              {page === item.key && (
                <motion.div layoutId="nav-active" className="absolute inset-0 rounded-xl"
                  style={{ background: "rgba(203,166,247,0.12)", border: "1px solid rgba(203,166,247,0.3)", boxShadow: "0 0 12px rgba(203,166,247,0.15)" }}
                  transition={{ type: "spring", duration: 0.4 }} />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="hidden md:flex px-3 py-1.5 rounded-lg text-xs font-bold border text-muted-foreground hover:text-foreground transition-all"
            style={{ borderColor: "rgba(203,166,247,0.25)", background: "rgba(203,166,247,0.06)", color: "#6c7086" }}>
            {t.langBtn}
          </button>
          <Magnetic>
            <motion.a href="tel:+962790082373" onClick={addRipple as any}
              className="gold-btn ripple-btn hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
              whileTap={{ scale: 0.96 }}>
              <Phone size={13} /> {t.contactBtn}
            </motion.a>
          </Magnetic>

          {/* Mobile: lang toggle only */}
          <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border"
            style={{ borderColor: "rgba(200,162,75,0.2)", color: "#9ca3af" }}>
            <Globe size={13} style={{ color: "#6c7086" }} />
            {t.langBtn}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

// ── Bottom Tab Bar (mobile only) ──────────────────────────────────────────────
const BOTTOM_TABS = [
  { key: "home"     as Page, Icon: Home,          labelAr: "الرئيسية",  labelEn: "Home"     },
  { key: "services" as Page, Icon: Layers,         labelAr: "خدماتنا",   labelEn: "Services"  },
  { key: "about"    as Page, Icon: Info,           labelAr: "من نحن",    labelEn: "About"     },
  { key: "contact"  as Page, Icon: MessageSquare,  labelAr: "تواصل",    labelEn: "Contact"   },
];

function BottomNav({ page, setPage, lang }: { page: Page; setPage: (p: Page) => void; lang: Lang }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 280, damping: 28 }}
      className="md:hidden fixed bottom-0 inset-x-0 z-50"
      style={{
        background: "linear-gradient(180deg, rgba(24,24,37,0.92) 0%, rgba(15,15,23,0.98) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderTop: "1px solid rgba(203,166,247,0.15)",
        boxShadow: "0 -1px 0 rgba(203,166,247,0.08), 0 -12px 40px rgba(0,0,0,0.7)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around px-2 h-[62px]">
        {BOTTOM_TABS.map((tab) => {
          const active = page === tab.key;
          const label = lang === "ar" ? tab.labelAr : tab.labelEn;
          return (
            <motion.button
              key={tab.key}
              onClick={() => setPage(tab.key)}
              whileTap={{ scale: 0.85 }}
              className="relative flex flex-col items-center justify-center gap-1 rounded-2xl transition-all"
              style={{ minWidth: 60, padding: "6px 12px" }}
            >
              {/* Glossy active pill behind icon+label */}
              {active && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(203,166,247,0.2) 0%, rgba(166,227,161,0.1) 100%)",
                    border: "1px solid rgba(203,166,247,0.4)",
                    boxShadow: "0 0 20px rgba(203,166,247,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Top indicator dot */}
              {active && (
                <motion.div
                  layoutId="tab-dot"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ background: GRAD_GOLD, boxShadow: `0 0 8px ${C.purple}` }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{ y: active ? -1 : 0, scale: active ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="relative z-10"
              >
                <tab.Icon
                  size={20}
                  style={{
                    color: active ? C.purple : "#6c7086",
                    filter: active ? `drop-shadow(0 0 6px ${C.purple}80)` : "none",
                    transition: "color 0.2s",
                  }}
                />
              </motion.div>

              {/* Label */}
              <span
                className="relative z-10 font-bold leading-none"
                style={{
                  fontSize: 10,
                  color: active ? C.purple : "#6c7086",
                  transition: "color 0.2s",
                }}
              >
                {label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
function HomePage({ t, setPage }: { t: (typeof T)["ar"]; setPage: (p: Page) => void }) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const full = t.hero.terminalLine;
    let i = 0;
    const id = setInterval(() => { i++; setTyped(full.slice(0, i)); if (i >= full.length) clearInterval(id); }, 55);
    return () => clearInterval(id);
  }, [t.hero.terminalLine]);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-[68px]">
        <HeroBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
          {/* Split layout: text left, code editor right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="relative">
            {/* Terminal line */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mb-6 text-sm font-mono"
              style={{ color: C.green }}>
              <Terminal size={14} />
              <span>{typed}<span className="animate-pulse">|</span></span>
            </motion.div>

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="flex mb-6"><Badge>{t.hero.badge}</Badge></motion.div>

            {/* Headline — uses animate (not whileInView) so it triggers on mount */}
            <div className="mb-6">
              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[clamp(2.8rem,7vw,6rem)] font-black leading-[1.0] tracking-tight"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 2px 40px rgba(0,0,0,0.9)",
                  }}
                >
                  {t.hero.line1}
                </motion.h1>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="gold-text text-[clamp(2.8rem,7vw,6rem)] font-black leading-[1.0] tracking-tight"
                >
                  {t.hero.line2}
                </motion.h1>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg leading-relaxed mb-10 max-w-xl"
              style={{ color: "#a6adc8", textShadow: "0 1px 12px rgba(0,0,0,0.9)" }}
            >{t.hero.sub}</motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex flex-wrap gap-4 mb-16">
                <Magnetic>
                  <motion.button
                    onClick={(e) => { addRipple(e); setPage("contact"); }}
                    whileTap={{ scale: 0.97 }}
                    className="gold-btn ripple-btn inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base">
                    {t.hero.cta}
                    <ArrowRight size={18} className={t.dir === "rtl" ? "rotate-180" : ""} />
                  </motion.button>
                </Magnetic>
                <Magnetic>
                  <motion.button
                    onClick={(e) => { addRipple(e); setPage("services"); }}
                    whileTap={{ scale: 0.97 }}
                    className="outline-btn ripple-btn inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base">
                    {t.hero.cta2}
                  </motion.button>
                </Magnetic>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
                style={{ borderTop: "1px solid rgba(203,166,247,0.1)" }}>
                {t.stats.map((s, i) => <StatCounter key={i} num={s.num} suffix={s.suffix} label={s.label} icon={s.icon} />)}
              </div>
            </motion.div>
          </div>

          {/* Right column — 3D Code Editor (desktop only) */}
          <div className="hidden lg:block relative" style={{ height: 440 }}>
            <FloatingCodeEditor dir={t.dir} />
          </div>

          </div>{/* end grid */}
        </div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <span className="text-xs uppercase tracking-widest" style={{ color: "#6c7086" }}>{t.hero.scrollText}</span>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, ${C.purple})` }} />
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: C.purple, boxShadow: `0 0 8px ${C.purple}` }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </section>

      {/* ── Ticker ── */}
      <Ticker items={t.ticker} />

      {/* ── Services ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge={t.services.badge} title={t.services.title} sub={t.services.sub} goldTitle />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.services.items.map((item, i) => (
              <ServiceCard key={i} item={item} index={i} dir={t.dir} learnMore={t.services.learnMore} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why SOWWAN ── */}
      <section className="py-28" style={{ background: "linear-gradient(180deg, #0f0f17 0%, #1e1e2e 50%, #0f0f17 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge={t.features.badge} title={t.features.title} sub={t.features.sub} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.features.items.map((f, i) => {
              const Icon = f.icon;
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <motion.div whileHover={{ y: -8, scale: 1.03 }} transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="p-6 rounded-2xl flex gap-5 gloss-surface">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${f.color}12`, border: `1px solid ${f.color}28`, boxShadow: `0 0 15px ${f.color}12` }}>
                      <Icon size={22} style={{ color: f.color, filter: `drop-shadow(0 0 5px ${f.color})` }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base mb-1.5">{f.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader badge={t.process.badge} title={t.process.title} sub={t.process.sub} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                  className="relative p-7 rounded-2xl h-full gloss-surface">
                  <div className="text-5xl font-black mb-4 leading-none font-mono"
                    style={{ background: GRAD_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.7 }}>
                    {step.num}
                  </div>
                  <h4 className="font-black text-foreground text-lg mb-2">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            style={{ background: "linear-gradient(135deg, rgba(203,166,247,0.08), rgba(137,220,235,0.08))", border: "1px solid rgba(203,166,247,0.18)", boxShadow: "0 0 80px rgba(203,166,247,0.07), 0 32px 80px rgba(0,0,0,0.55)" }}>
            <div className="absolute top-6 right-6 opacity-20 pointer-events-none" style={{ perspective: 500 }}>
              <motion.div animate={{ rotateX: [0,360], rotateY: [0,360] }} transition={{ rotateX: { duration: 20, repeat: Infinity, ease: "linear" }, rotateY: { duration: 15, repeat: Infinity, ease: "linear" } }} style={{ width: 80, height: 80, position: "relative", transformStyle: "preserve-3d" }}>
                {[`translateZ(40px)`,`rotateY(180deg) translateZ(40px)`,`rotateY(90deg) translateZ(40px)`,`rotateY(-90deg) translateZ(40px)`,`rotateX(90deg) translateZ(40px)`,`rotateX(-90deg) translateZ(40px)`].map((t,i)=>(
                  <div key={i} style={{ position:"absolute", inset:0, border:`1px solid ${C.purple}`, background:`${C.purple}08`, transform:t }} />
                ))}
              </motion.div>
            </div>
            <div className="absolute bottom-6 left-6 opacity-15 pointer-events-none" style={{ perspective: 400 }}>
              <motion.div animate={{ rotateX: [0,360], rotateY: [0,360] }} transition={{ rotateX: { duration: 14, repeat: Infinity, ease: "linear" }, rotateY: { duration: 18, repeat: Infinity, ease: "linear" } }} style={{ width: 50, height: 50, position: "relative", transformStyle: "preserve-3d" }}>
                {[`translateZ(25px)`,`rotateY(180deg) translateZ(25px)`,`rotateY(90deg) translateZ(25px)`,`rotateY(-90deg) translateZ(25px)`,`rotateX(90deg) translateZ(25px)`,`rotateX(-90deg) translateZ(25px)`].map((t,i)=>(
                  <div key={i} style={{ position:"absolute", inset:0, border:`1px solid ${C.cyan}`, background:`${C.cyan}08`, transform:t }} />
                ))}
              </motion.div>
            </div>
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                {t.dir === "rtl" ? "مستعد لتنمية أعمالك رقمياً؟" : "Ready to grow your business digitally?"}
              </h2>
            </Reveal>
            <FadeIn delay={0.15}>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                {t.dir === "rtl" ? "تواصل معنا الآن واحصل على استشارة مجانية لا تُكلّفك شيئاً" : "Contact us now for a free consultation that costs you nothing"}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.button onClick={() => setPage("contact")} whileTap={{ scale: 0.97 }}
                  className="gold-btn inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl text-base">
                  {t.dir === "rtl" ? "احصل على استشارة مجانية" : "Get Free Consultation"}
                  <ArrowRight size={18} className={t.dir === "rtl" ? "rotate-180" : ""} />
                </motion.button>
                <motion.a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-2xl font-bold text-base text-foreground"
                  style={{ border: "1px solid rgba(37,211,102,0.35)", background: "rgba(37,211,102,0.08)", color: "#25d366" }}>
                  <WaSvg size={18} /> WhatsApp
                </motion.a>
              </div>
            </FadeIn>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ── Services Page ─────────────────────────────────────────────────────────────
function ServicesPage({ t }: { t: (typeof T)["ar"] }) {
  return (
    <div className="pt-32 pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge={t.services.badge} title={t.services.title} sub={t.services.sub} goldTitle />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-24">
          {t.services.items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} dir={t.dir} learnMore={t.services.learnMore} />
          ))}
        </div>
        <SectionHeader badge={t.process.badge} title={t.process.title} sub={t.process.sub} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {t.process.steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-7 rounded-2xl h-full gloss-surface">
                <div className="text-5xl font-black mb-4 font-mono" style={{ background: GRAD_MAIN, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.7 }}>{step.num}</div>
                <h4 className="font-black text-foreground text-lg mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl p-12 text-center"
          style={{ background: "linear-gradient(135deg, rgba(203,166,247,0.1) 0%, rgba(137,220,235,0.07) 100%)", border: "1px solid rgba(203,166,247,0.18)", boxShadow: "0 0 50px rgba(203,166,247,0.06), 0 20px 50px rgba(0,0,0,0.5)" }}>
          <h3 className="text-3xl font-black text-foreground mb-3">{t.dir === "rtl" ? "ابدأ مشروعك اليوم" : "Start Your Project Today"}</h3>
          <p className="text-muted-foreground mb-8">{t.dir === "rtl" ? "استشارة مجانية — بدون أي التزام" : "Free consultation — no commitment"}</p>
          <motion.a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-bold text-lg"
            style={{ background: "#25d366", color: "#fff", boxShadow: "0 0 30px rgba(37,211,102,0.35)" }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <WaSvg size={22} /> {t.contact.waBtn}
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

// ── About Page ────────────────────────────────────────────────────────────────
function AboutPage({ t }: { t: (typeof T)["ar"] }) {
  return (
    <div className="pt-32 pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge={t.about.badge} title={t.about.title} sub={t.about.sub} goldTitle />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <FadeIn x={t.dir === "rtl" ? 40 : -40}>
            <p className="text-muted-foreground text-lg leading-relaxed mb-5">{t.about.p1}</p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-9">{t.about.p2}</p>
            <div className="grid grid-cols-2 gap-3">
              {t.about.values.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-2.5 text-sm text-foreground font-semibold">
                  <CheckCircle size={14} style={{ color: SERVICE_COLORS[i % 4], flexShrink: 0, marginTop: 2 }} /> {v}
                </motion.div>
              ))}
            </div>
          </FadeIn>
          <FadeIn x={t.dir === "rtl" ? -40 : 40}>
            <div className="grid grid-cols-2 gap-4">
              {t.stats.map((s, i) => (
                <div key={i} className="rounded-2xl p-8 text-center gloss-surface"
                  style={{ borderColor: `${SERVICE_COLORS[i]}20` }}>
                  <StatCounter num={s.num} suffix={s.suffix} label={s.label} icon={s.icon} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <SectionHeader badge={t.features.badge} title={t.features.title} sub={t.features.sub} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {t.features.items.map((f, i) => {
            const Icon = f.icon;
            return (
              <FadeIn key={i} delay={i * 0.07}>
                <motion.div whileHover={{ y: -7, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} className="p-6 rounded-2xl flex gap-5 gloss-surface">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${f.color}12`, border: `1px solid ${f.color}25` }}>
                    <Icon size={20} style={{ color: f.color }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1">{f.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden" style={{ height: 360 }}>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=360&fit=crop&auto=format"
            alt={t.about.imgAlt} className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5) saturate(0.5)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(232,184,75,0.15), rgba(0,180,255,0.1))" }} />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <p className="text-white text-3xl md:text-4xl font-black mb-2">{t.about.teamLabel}</p>
              <p className="text-white/50">{t.about.teamSub}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Contact Page ──────────────────────────────────────────────────────────────
function ContactPage({ t }: { t: (typeof T)["ar"] }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const isAr = t.dir === "rtl";
    const lines = [
      isAr ? `🌐 *رسالة جديدة من موقع SOWWAN*` : `🌐 *New message from SOWWAN website*`,
      ``,
      `👤 ${isAr ? "الاسم" : "Name"}: ${form.name}`,
      `📧 ${isAr ? "البريد" : "Email"}: ${form.email}`,
      form.phone ? `📱 ${isAr ? "الهاتف" : "Phone"}: ${form.phone}` : null,
      form.service ? `🛠 ${isAr ? "الخدمة" : "Service"}: ${form.service}` : null,
      ``,
      `💬 ${isAr ? "الرسالة" : "Message"}:`,
      form.message,
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 800);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(0,0,20,0.5)",
    border: "1px solid rgba(203,166,247,0.18)",
    color: "#cdd6f4",
    borderRadius: "0.875rem",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="pt-32 pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader badge={t.contact.badge} title={t.contact.title} sub={t.contact.sub} goldTitle />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Form */}
          <FadeIn x={t.dir === "rtl" ? 40 : -40} className="lg:col-span-2">
            <div className="rounded-3xl p-8 md:p-10 gloss-surface">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-16 gap-5">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180 }}>
                      <div className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(232,184,75,0.12)", border: "2px solid rgba(232,184,75,0.4)", boxShadow: "0 0 30px rgba(232,184,75,0.2)" }}>
                        <CheckCircle size={40} style={{ color: C.purple }} />
                      </div>
                    </motion.div>
                    <p className="text-foreground font-semibold text-xl">{t.contact.success}</p>
                    <motion.a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
                      style={{ background: "#25d366", color: "#fff" }}
                      whileHover={{ scale: 1.04 }}>
                      <WaSvg size={16} /> WhatsApp
                    </motion.a>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder={t.contact.namePh} style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = "rgba(232,184,75,0.5)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(232,184,75,0.15)")} />
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder={t.contact.emailPh} style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = "rgba(232,184,75,0.5)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(232,184,75,0.15)")} />
                    </div>
                    <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder={t.contact.phonePh} style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "rgba(232,184,75,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(232,184,75,0.15)")} />
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      style={{ ...inputStyle, color: form.service ? "#cdd6f4" : "#6c7086" }}>
                      <option value="">{t.contact.servicePh}</option>
                      {t.contact.opts.map((o, i) => <option key={i} value={o}>{o}</option>)}
                    </select>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contact.msgPh}
                      style={{ ...inputStyle, resize: "none" } as React.CSSProperties}
                      onFocus={e => (e.target.style.borderColor = "rgba(232,184,75,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(232,184,75,0.15)")} />
                    <motion.button type="submit" disabled={loading}
                      className="gold-btn w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 disabled:opacity-70"
                      whileTap={{ scale: 0.98 }}>
                      {loading ? (
                        <motion.div className="w-5 h-5 rounded-full border-2"
                          style={{ borderColor: "rgba(255,255,255,0.4)", borderTopColor: "#fff" }}
                          animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                      ) : (
                        <>{t.contact.send} <ArrowRight size={18} className={t.dir === "rtl" ? "rotate-180" : ""} /></>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn x={t.dir === "rtl" ? -40 : 40} className="lg:col-span-1 flex flex-col gap-4">
            {/* WhatsApp */}
            <motion.a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}
              className="flex items-center gap-4 p-6 rounded-2xl"
              style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.22)" }}>
              <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#25d366" }}>
                <WaSvg size={24} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">{t.contact.infoItems[0].label}</div>
                <div className="font-black text-foreground" dir="ltr">{PHONE_DISPLAY}</div>
              </div>
            </motion.a>

            {/* Instagram */}
            <motion.a href={IG_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}
              className="flex items-center gap-4 p-5 rounded-2xl gloss-surface">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(225,48,108,0.12)", border: "1px solid rgba(225,48,108,0.25)" }}>
                <span style={{ color: "#e1306c" }}><IgSvg /></span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">{t.contact.infoItems[1].label}</div>
                <div className="font-bold text-foreground">@sowwanjo</div>
              </div>
            </motion.a>

            {/* Facebook */}
            <motion.a href={FB_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }} transition={{ duration: 0.2 }}
              className="flex items-center gap-4 p-5 rounded-2xl gloss-surface">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(24,119,242,0.12)", border: "1px solid rgba(24,119,242,0.25)" }}>
                <span style={{ color: "#1877f2" }}><FbSvg /></span>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">{t.contact.infoItems[2].label}</div>
                <div className="font-bold text-foreground">sowwanjo</div>
              </div>
            </motion.a>

            {/* Phone */}
            <a href="tel:+962790082373"
              className="flex items-center gap-4 p-5 rounded-2xl gloss-surface">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(232,184,75,0.1)", border: "1px solid rgba(232,184,75,0.22)" }}>
                <Phone size={18} style={{ color: C.purple }} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">{t.dir === "rtl" ? "هاتف مباشر" : "Direct Phone"}</div>
                <div className="font-bold text-foreground" dir="ltr">{PHONE_DISPLAY}</div>
              </div>
            </a>

            {/* Hours */}
            <div className="rounded-2xl p-6 gloss-surface"
              style={{ background: "linear-gradient(135deg, rgba(232,184,75,0.05), rgba(0,180,255,0.04))" }}>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: C.purple }}>
                <Clock size={14} /> {t.contact.hours}
              </h4>
              <div className="space-y-3 text-sm">
                {[
                  { day: t.contact.weekdays, h: t.contact.weekdaysH, color: C.green },
                  { day: t.contact.sat, h: t.contact.satH, color: C.purple },
                  { day: t.contact.fri, h: t.contact.friH, color: "#ef4444" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-muted-foreground">{row.day}</span>
                    <span className="font-semibold" style={{ color: row.color }}>{row.h}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ t, setPage }: { t: (typeof T)["ar"]; setPage: (p: Page) => void }) {
  return (
    <footer style={{ background: "linear-gradient(180deg, #181825 0%, #0f0f17 100%)", borderTop: "1px solid rgba(203,166,247,0.12)" }}>
      {/* Cyan accent line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(203,166,247,0.6), rgba(166,227,161,0.6), transparent)", boxShadow: "0 0 12px rgba(203,166,247,0.35)" }} />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: GRAD_GOLD, boxShadow: `0 0 20px rgba(232,184,75,0.3)` }}>
                <span className="text-[#03030a] font-black text-lg">S</span>
              </div>
              <span className="font-black text-2xl gold-text">{BRAND}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-3">
              {[
                { href: `https://wa.me/${WA_NUMBER}`, icon: <WaSvg size={15} />, hoverColor: "#25d366" },
                { href: IG_URL, icon: <IgSvg />, hoverColor: "#e1306c" },
                { href: FB_URL, icon: <FbSvg />, hoverColor: "#1877f2" },
                { href: "tel:+962790082373", icon: <Phone size={15} />, hoverColor: C.purple },
              ].map((s, i) => (
                <motion.a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all"
                  style={{ borderColor: "rgba(203,166,247,0.15)", color: "#6c7086", background: "rgba(203,166,247,0.04)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = s.hoverColor; (e.currentTarget as HTMLAnchorElement).style.borderColor = s.hoverColor + "40"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#6b6a7a"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(232,184,75,0.15)"; }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: "#6c7086" }}>{t.dir === "rtl" ? "الموقع" : "Navigation"}</h5>
            <div className="flex flex-col gap-2.5">
              {t.footer.links.map((label, i) => (
                <button key={i} onClick={() => setPage(t.footer.linksKeys[i])}
                  className="text-start text-sm text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-1.5">
                  <ChevronRight size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${t.dir === "rtl" ? "rotate-180" : ""}`} style={{ color: C.purple }} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: "#6c7086" }}>{t.footer.contactTitle}</h5>
            <div className="flex flex-col gap-3">
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <WaSvg size={12} /> <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <a href={IG_URL} target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <IgSvg /> @sowwanjo
              </a>
              <a href={FB_URL} target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <FbSvg /> sowwanjo
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(203,166,247,0.1)" }}>
          <p className="text-muted-foreground text-xs">© 2026 {BRAND} — {t.footer.rights}</p>
          <p className="text-muted-foreground text-xs">{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Float ────────────────────────────────────────────────────────────
function WhatsAppFloat({ label }: { label: string }) {
  const [tip, setTip] = useState(false);
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 160 }}
      className="fixed bottom-[84px] right-4 z-50 md:bottom-6 md:right-6">
      <AnimatePresence>
        {tip && (
          <motion.div initial={{ opacity: 0, x: 10, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-3 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap"
            style={{ background: "rgba(15,15,23,0.96)", border: "1px solid rgba(37,211,102,0.3)", color: "#cdd6f4", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
            <span style={{ color: "#25d366" }}>{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="absolute inset-0 rounded-full" style={{ background: "rgba(37,211,102,0.2)" }}
        animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
        <motion.a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setTip(true)} onMouseLeave={() => setTip(false)}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full"
          style={{ background: "#25d366", boxShadow: "0 6px 28px rgba(37,211,102,0.5)" }}>
          <WaSvg size={27} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

// ── Scroll Progress ───────────────────────────────────────────────────────────
function ScrollBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-0.5 origin-left"
      style={{ background: GRAD_MAIN, transform: `scaleX(${p})`, transformOrigin: "left", boxShadow: "0 0 8px rgba(184,137,58,0.5)" }} />
  );
}

// ── Cursor Spotlight ──────────────────────────────────────────────────────────
function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.setProperty("--cx", `${e.clientX}px`);
        ref.current.style.setProperty("--cy", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-[1] hidden md:block"
      style={{
        background: "radial-gradient(380px circle at var(--cx,-500px) var(--cy,-500px), rgba(203,166,247,0.042) 0%, transparent 65%)",
        transition: "background 0.05s linear",
      } as React.CSSProperties} />
  );
}

// ── Magnetic Wrapper ──────────────────────────────────────────────────────────
function Magnetic({ children, strength = 0.22 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div ref={ref} className="magnetic-wrap"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({ x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      {children}
    </div>
  );
}

// ── Ripple Button ─────────────────────────────────────────────────────────────
function addRipple(e: React.MouseEvent<HTMLElement>) {
  const btn = e.currentTarget;
  const circle = document.createElement("span");
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.className = "ripple-circle";
  circle.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

// ── Scramble Text ─────────────────────────────────────────────────────────────
const SCRAMBLE = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz0123456789!@#$&*<>/";

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);
  const iterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!active) { setDisplay(text); iterRef.current = 0; return; }
    iterRef.current = 0;
    timerRef.current = setInterval(() => {
      iterRef.current += 0.6;
      setDisplay(
        text.split("").map((ch, i) => {
          if (ch === " ") return " ";
          if (i < iterRef.current) return ch;
          return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        }).join("")
      );
      if (iterRef.current >= text.length) {
        setDisplay(text);
        clearInterval(timerRef.current!);
      }
    }, 32);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active, text]);

  return <span className="scramble-text">{display}</span>;
}

// ── URL ↔ Page helpers ────────────────────────────────────────────────────────
const PATH_TO_PAGE: Record<string, Page> = {
  "/": "home",
  "/services": "services",
  "/about": "about",
  "/contact": "contact",
};
const PAGE_TO_PATH: Record<Page, string> = {
  home: "/",
  services: "/services",
  about: "/about",
  contact: "/contact",
};

// ── Layout (uses React Router hooks) ─────────────────────────────────────────
function Layout() {
  const [lang, setLang] = useState<Lang>("ar");
  const location = useLocation();
  const navigate = useNavigate();

  const page: Page = PATH_TO_PAGE[location.pathname] ?? "home";
  const setPage = (p: Page) => navigate(PAGE_TO_PATH[p]);
  const t = T[lang];

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname, lang]);

  return (
    <div dir={t.dir} className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Cairo', 'Inter', sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <CursorSpotlight />
      <ScrollBar />
      <Navbar t={t} lang={lang} setLang={setLang} page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        <motion.main key={`${lang}-${location.pathname}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pb-[62px] md:pb-0">
          {page === "home"    && <HomePage t={t} setPage={setPage} />}
          {page === "services" && <ServicesPage t={t} />}
          {page === "about"   && <AboutPage t={t} />}
          {page === "contact" && <ContactPage t={t} />}
        </motion.main>
      </AnimatePresence>
      <Footer t={t} setPage={setPage} />
      <WhatsAppFloat label={t.waFloat} />
      <BottomNav page={page} setPage={setPage} lang={lang} />
    </div>
  );
}

// ── Router ────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  { path: "/",         Component: Layout },
  { path: "/services", Component: Layout },
  { path: "/about",    Component: Layout },
  { path: "/contact",  Component: Layout },
]);

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
