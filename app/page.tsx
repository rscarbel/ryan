import { getContentByKey } from "@/lib/siteContent";
import ryansvg from "./ryansvg";

export default async function Home() {
  const siteHeadline = await getContentByKey("SITE_HEADLINE");
  const siteSubtitle = await getContentByKey("SITE_SUBTITLE");
  const aboutHeading = await getContentByKey("ABOUT_HEADING");
  const aboutContent1 = await getContentByKey("ABOUT_CONTENT_1");
  const aboutContent2 = await getContentByKey("ABOUT_CONTENT_2");
  const aboutContent3 = await getContentByKey("ABOUT_CONTENT_3");
  const skillsSecionHeading = await getContentByKey("SKILLS_SECTION_HEADING");
  const skillsSectionSubheading = await getContentByKey(
    "SKILLS_SECTION_SUBHEADING"
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{siteHeadline?.content || "Site Headline goes here"}</h1>
      <h3>{siteSubtitle?.content || ""} </h3>
      <section className="flex flex-col items-center justify-center">
        <h2>{aboutHeading?.content || ""}</h2>
        <p>{aboutContent1?.content || ""}</p>
        <p>{aboutContent2?.content || ""}</p>
        <p>{aboutContent3?.content || ""}</p>
      </section>
      <section className="flex flex-col items-center justify-center">
        <h2>{skillsSecionHeading?.content || ""}</h2>
        <p>{skillsSectionSubheading?.content || ""}</p>
      </section>
    </main>
  );
}
