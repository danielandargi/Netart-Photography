# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

## Sanity CMS Configuration

Get these values from https://www.sanity.io/manage after creating a project:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Form Submission (Optional)

For the contact form to send emails, set up Formspree at https://formspree.io/:

```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

---

## How to Set Up Sanity (Step by Step)

### 1. Create a Sanity Project

1. Go to https://www.sanity.io/manage
2. Sign up or log in
3. Click "Create new project"
4. Name your project "NetArt Photography"
5. Choose the "Clean project with no predefined schemas" option
6. Copy your **Project ID**

### 2. Configure CORS

1. In your Sanity project dashboard, go to **API** → **CORS origins**
2. Add the following origins:
   - `http://localhost:3000` (for development)
   - Your production domain (e.g., `https://netart.vercel.app`)
3. Make sure **Allow credentials** is enabled

### 3. Create the Schema

1. Install Sanity CLI: `npm install -g @sanity/cli`
2. Create a separate Sanity Studio project:

```bash
# In a separate folder (not in the Next.js project)
npx sanity@latest init --create-project "NetArt Studio" --dataset production
```

3. Replace the schema files in the studio with the schemas from `src/sanity/schemas/`

### 4. Access the Sanity Studio

- Use the hosted Sanity Studio at: https://www.sanity.io/manage
- Or run your own studio: `cd sanity-studio && npm run dev`

---

## Schema Reference

Copy these schemas to your Sanity Studio project:

### Service Schema (service.ts)

```typescript
export default {
  name: "service",
  title: "שירות",
  type: "document",
  fields: [
    { name: "title", title: "שם השירות", type: "string" },
    { name: "slug", title: "כתובת URL", type: "slug", options: { source: "title" } },
    { name: "description", title: "תיאור קצר", type: "text" },
    { name: "fullDescription", title: "תיאור מלא", type: "text" },
    { name: "thumbnail", title: "תמונת תצוגה", type: "image", options: { hotspot: true } },
    { name: "heroBanner", title: "תמונת כותרת", type: "image", options: { hotspot: true } },
    { 
      name: "gallery", 
      title: "גלריית תמונות", 
      type: "array", 
      of: [{ 
        type: "image", 
        options: { hotspot: true },
        fields: [
          { name: "caption", title: "כיתוב", type: "string" },
          { name: "alt", title: "טקסט חלופי", type: "string" }
        ]
      }]
    },
    { name: "order", title: "סדר תצוגה", type: "number" }
  ]
}
```

### Site Settings Schema (siteSettings.ts)

```typescript
export default {
  name: "siteSettings",
  title: "הגדרות האתר",
  type: "document",
  fields: [
    { name: "siteName", title: "שם האתר", type: "string" },
    { name: "heroTitle", title: "כותרת ראשית", type: "string" },
    { name: "heroSubtitle", title: "תת כותרת", type: "text" },
    { name: "heroImage", title: "תמונת רקע ראשית", type: "image", options: { hotspot: true } },
    { name: "aboutTitle", title: "כותרת אודות", type: "string" },
    { name: "aboutText", title: "טקסט אודות", type: "text" },
    { name: "aboutImage", title: "תמונת הצלמת", type: "image", options: { hotspot: true } },
    { name: "email", title: "אימייל", type: "string" },
    { name: "phone", title: "טלפון", type: "string" },
    { name: "whatsapp", title: "קישור וואטסאפ", type: "url" },
    { name: "instagram", title: "קישור אינסטגרם", type: "url" },
    { name: "facebook", title: "קישור פייסבוק", type: "url" }
  ]
}
```

---

## Quick Start Without Sanity

The website works perfectly without Sanity! It uses default static content.

To customize without CMS:
1. Edit the content in `src/lib/utils.ts`
2. Replace placeholder images in `public/images/`
3. Update contact info directly in the code

When you're ready to use Sanity, follow the steps above.
