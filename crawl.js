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

export async function crawlPage(url) {
  let page 
  try {
    page = await fetch(url)
  } catch (e) {
    throw new Error(`Got Network error: ${err.message}`);
  }
  if (page.status >= 400) {
    console.log("bad response")
    return
  }
  if (!page.headers.get('content-type')?.startsWith('text/html')) {
    console.log("not an html response")
    return
  }
  const text = await page.text();
  console.log(text)
}