export const RTL_STORAGE_KEY = "decathemes-rtl"

export function getStoredRtl(): boolean {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(RTL_STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

export function setStoredRtl(rtl: boolean): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(RTL_STORAGE_KEY, rtl ? "1" : "0")
  } catch {
    // ignore
  }
}

export function applyRtl(rtl: boolean): void {
  if (typeof document === "undefined") return
  document.documentElement.dir = rtl ? "rtl" : "ltr"
  document.documentElement.dataset.rtl = rtl ? "true" : "false"
}
