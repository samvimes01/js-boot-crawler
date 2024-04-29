export function normalizeURL(url) {
  try {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.slice(-1) === "/") {
      fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
  } catch (error) {
    throw new Error("bad url")
  }
}

