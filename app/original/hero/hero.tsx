import { getContentByKey } from "@/lib/siteContent";

export default async function Hero() {
  const siteHeadline = await getContentByKey("SITE_HEADLINE");
  const siteSubtitle = await getContentByKey("SITE_SUBTITLE");

  return (
    <section className="flex flex-col items-center justify-center">
      <h1>{siteHeadline?.content || "Site Headline goes here"}</h1>
      <h3>{siteSubtitle?.content || ""} </h3>
    </section>
  );
}
