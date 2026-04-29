export const SWR_KEYS = {
  avatar: ["/avatar-card", { populate: "*" }],
  workPage: [
    "/work-page",
    {
      populate: {
        introduction: { populate: "*" },
        work_items: { populate: { work_cards: { populate: "*" } } },
      },
    },
  ],
  header: ["/header", { populate: "socials" }],
  aboutPage: [
    "/about-page",
    {
      populate: {
        song_audio_file: true,
        sections: { populate: { section_items: { populate: "*" } } },
      },
    },
  ],
  resume: ["/resume"],
  footer: ["/footer"],
  labArticles: [
    "/articles",
    { filters: { categories: { type: { $eq: "work" } } }, populate: "*" },
  ],
  blogCategories: ["/categories", { filters: { type: { $eq: "blog" } } }],
  blogIntelLevels: ["/intel-levels"],
  blogReadTimes: ["/read-times"],
} as const;
