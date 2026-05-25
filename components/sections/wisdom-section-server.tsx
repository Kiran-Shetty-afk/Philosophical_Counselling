import { getDailyQuote } from "@/lib/wisdom-store";
import { WisdomSection } from "@/components/sections/wisdom-section";

/**
 * Server component wrapper — fetches the initial quote at render time
 * so the page is never blank on first load, then hands off to the
 * client component for animated refresh interactions.
 */
export function WisdomSectionServer() {
  const quote = getDailyQuote();
  return <WisdomSection initialQuote={quote} />;
}
