import HomePageClient from "@/components/HomePageClient";
import { getWebsiteContentFromDb } from "@/lib/server/contentStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {
  const content = await getWebsiteContentFromDb();

  return <HomePageClient content={content} />;
}
