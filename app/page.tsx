import { getContentByKey } from "@/lib/siteContent";
import ryansvg from "./ryansvg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        {(await getContentByKey("SITE_HEADLINE")) || "Site Headline goes here"}
      </h1>
      <h3>{(await getContentByKey("SITE_SUBTITLE")) || ""} </h3>
      {ryansvg}
    </main>
  );
}
