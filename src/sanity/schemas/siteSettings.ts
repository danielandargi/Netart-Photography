import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "הגדרות האתר",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "שם האתר",
      type: "string",
      initialValue: "NetArt",
    }),
    defineField({
      name: "siteDescription",
      title: "תיאור האתר",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroTitle",
      title: "כותרת ראשית",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "תת כותרת ראשית",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "תמונת רקע ראשית",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "aboutTitle",
      title: "כותרת אודות",
      type: "string",
    }),
    defineField({
      name: "aboutText",
      title: "טקסט אודות",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "aboutImage",
      title: "תמונת הצלמת",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "email",
      title: "אימייל",
      type: "string",
      initialValue: "netaa.1801@gmail.com",
    }),
    defineField({
      name: "phone",
      title: "טלפון",
      type: "string",
      initialValue: "054-684-8175",
    }),
    defineField({
      name: "whatsapp",
      title: "קישור וואטסאפ",
      type: "url",
      initialValue: "https://wa.me/972546848175",
    }),
    defineField({
      name: "instagram",
      title: "קישור אינסטגרם",
      type: "url",
      initialValue: "https://www.instagram.com/netart_photo",
    }),
    defineField({
      name: "facebook",
      title: "קישור פייסבוק",
      type: "url",
      initialValue: "https://www.facebook.com/share/16xco5ruqe/",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "הגדרות האתר",
      };
    },
  },
});


