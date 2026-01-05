# NetArt Photography - אתר צילום מקצועי

אתר נחיתה מקצועי לצלמת עצמאית, בנוי עם Next.js 14, Tailwind CSS, ו-Sanity CMS.

## תכונות עיקריות

- 🎨 עיצוב מודרני ואלגנטי בעברית (RTL)
- 📱 רספונסיבי לכל המכשירים
- 🖼️ גלריות תמונות לכל שירות עם Lightbox
- ✏️ ניהול תוכן קל עם Sanity CMS
- 📧 טופס יצירת קשר עם שליחה למייל
- 💬 כפתור WhatsApp צף
- 🔗 אינטגרציה עם רשתות חברתיות

## שירותים המוצגים באתר

- צילומי הריון
- צילומי משפחה
- צילומי אירועים
- צילומי בוק בר/בת מצווה
- צילומי תדמית לעסק
- הצעת נישואין

## התקנה

```bash
# התקנת תלויות
npm install

# הרצה בסביבת פיתוח
npm run dev
```

## הגדרת סביבה

ראו את הקובץ `ENV_SETUP.md` להוראות מלאות.

צרו קובץ `.env.local` עם המשתנים הבאים:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint
```

## ניהול תוכן (Sanity CMS)

### גישה לממשק הניהול

לאחר הגדרת Sanity, גשו לכתובת:
- פיתוח: `http://localhost:3000/studio`
- ייצור: `https://your-domain.com/studio`

### עריכת תוכן

בממשק הניהול תוכלו לערוך:

1. **הגדרות האתר** - כותרות, טקסטים, תמונות ופרטי קשר
2. **שירותים** - כל שירות עם תיאור וגלריית תמונות משלו

### הוספת תמונות

1. היכנסו לממשק הניהול
2. בחרו את השירות או ההגדרה הרצויה
3. גררו ושחררו תמונות לשדות המתאימים
4. Sanity יטפל באופטימיזציה אוטומטית

## מבנה הפרויקט

```
src/
├── app/
│   ├── page.tsx              # דף הבית
│   ├── services/[slug]/      # דפי שירותים
│   └── studio/               # ממשק ניהול Sanity
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── ServicesGrid.tsx
│   ├── ServiceGallery.tsx
│   ├── ImageLightbox.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── sanity/
│   ├── schemas/              # סכמות תוכן
│   ├── client.ts
│   ├── queries.ts
│   └── lib.ts
└── lib/
    └── utils.ts              # מידע סטטי
```

## תיקיות תמונות

```
public/images/
├── hero/                     # תמונות ראשיות
├── about/                    # תמונת הצלמת
└── services/
    ├── pregnancy/            # גלריית הריון
    ├── family/               # גלריית משפחה
    ├── events/               # גלריית אירועים
    ├── bar-mitzvah/          # גלריית בר/בת מצווה
    ├── business/             # גלריית תדמית
    └── proposal/             # גלריית הצעות נישואין
```

## פרסום

הפרויקט אופטימיזי לפרסום ב-Vercel:

```bash
npm run build
```

## טכנולוגיות

- [Next.js 14](https://nextjs.org/) - App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sanity CMS](https://www.sanity.io/)
- [Formspree](https://formspree.io/) - שליחת טפסים

## רישיון

כל הזכויות שמורות © NetArt
