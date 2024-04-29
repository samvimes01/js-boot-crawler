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

export async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  try {
    const baseU = new URL(baseURL);
    const curU = new URL(currentURL);
    if (baseU.hostname != curU.hostname) {
      return pages;
    }
  } catch (error) {
    return pages;
  }
  const normalized = normalizeURL(currentURL);
  if (normalized in pages) {
    pages[normalized]++;
    return pages;
  }
  pages[normalized] = 1;
  try {
    const pageHtml = await getPageText(currentURL);
    const urls = getURLsFromHTML(pageHtml, baseURL)
    for (const url of urls) {
      await crawlPage(baseURL, url, pages)
    }
  } catch (error) {
    return pages
  }
  return pages;
}

async function getPageText(url) {
  let page;
  try {
    page = await fetch(url);
  } catch (e) {
    throw new Error(`Got Network error: ${err.message}`);
  }
  if (page.status >= 400) {
    console.log("bad response", url);
    return;
  }
  if (!page.headers.get("content-type")?.startsWith("text/html")) {
    console.log("not an html response", url);
    return;
  }
  const text = await page.text();
  return text
}