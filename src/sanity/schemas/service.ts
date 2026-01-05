import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "שירות",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "שם השירות",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "כתובת URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "תיאור קצר",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "fullDescription",
      title: "תיאור מלא",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "thumbnail",
      title: "תמונת תצוגה",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "heroBanner",
      title: "תמונת כותרת",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "גלריית תמונות",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              title: "כיתוב",
              type: "string",
            },
            {
              name: "alt",
              title: "טקסט חלופי",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "סדר תצוגה",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "סדר תצוגה",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
    },
  },
});


