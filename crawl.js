import { JSDOM } from "jsdom";

export function normalizeURL(url) {
  try {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.slice(-1) === "/") {
      fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
  } catch (error) {
    throw new Error("bad url");
  }
}

export function getURLsFromHTML(htmlBody, baseURL) {
  const anchors = new JSDOM(htmlBody).window.document.querySelectorAll("a");
  const links = Array.from(anchors)
    .filter((a) => a.hasAttribute("href"))
    .map((a) => {
      const href = a.getAttribute("href");
      try {
        const url = new URL(href, baseURL).href;
        return url;
      } catch (err) {
        return false;
      }
    })
    .filter(Boolean);
  return links
}
