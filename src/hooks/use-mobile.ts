import { MOBILE_MAX_WIDTH } from "@/lib/responsive"

import { useMediaQuery } from "./use-media-query"

const MOBILE_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px)`

/** True when viewport is at or below the mobile breakpoint (`src/lib/responsive.ts`). */
export function useIsMobile(): boolean {
  return useMediaQuery(MOBILE_QUERY)
}
