import { findOrCreateSiteContent } from "@/lib/siteContent";

const siteHeadline = "Fullstack software engineer, husband, cat-dad";
const siteSubText =
  "I write clean code, make friends with everyone, and love my life.";

const aboutHeading = "Hi! I'm Ryan!";
const aboutContent1 =
  "I'm a fullstack software engineer. I started my coding journey in 2008 by building desktop apps in visual basic. I took a hiatus from coding for a while and then picked it up again in 2019 by learning Python.";
const aboutContent2 =
  "In early 2020 I shifted towards web development. I worked as a software engineer for a startup starting at the end of 2020 and into 2021. I attended and graduated from a coding bootcamp, General Assembly to supplement my knowledge & skills. Today, I work as a Full Stack Software Engineer for HireArt.";
const aboutContent3 =
  "My strongest assets for a development team are my ability to work well with people of any personality type, do test-driven-development, and design system architecture.";

const skillsSecionHeading = "Skills";
const skillsSubHeading = "Here are some of my proficiencies";

export const addOldSiteContent = async () => {
  await Promise.all([
    findOrCreateSiteContent("SITE_HEADLINE", siteHeadline, "PLAIN_TEXT"),
    findOrCreateSiteContent("SITE_SUBTITLE", siteSubText, "PLAIN_TEXT"),
    findOrCreateSiteContent("ABOUT_HEADING", aboutHeading, "PLAIN_TEXT"),
    findOrCreateSiteContent("ABOUT_CONTENT_1", aboutContent1, "PLAIN_TEXT"),
    findOrCreateSiteContent("ABOUT_CONTENT_2", aboutContent2, "PLAIN_TEXT"),
    findOrCreateSiteContent("ABOUT_CONTENT_3", aboutContent3, "PLAIN_TEXT"),
    findOrCreateSiteContent(
      "SKILLS_SECTION_HEADING",
      skillsSecionHeading,
      "PLAIN_TEXT"
    ),
    findOrCreateSiteContent(
      "SKILLS_SECTION_SUBHEADING",
      skillsSubHeading,
      "PLAIN_TEXT"
    ),
  ]);
};
