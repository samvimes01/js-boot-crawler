import assert from "node:assert";
import { describe, it } from "node:test";

import { getURLsFromHTML, normalizeURL } from "./crawl.js";

describe(normalizeURL.name, () => {
  it("normal flow", () => {
    const cases = [
      { input: "https://blog.boot.dev/path/", result: "blog.boot.dev/path" },
      { input: "https://blog.boot.dev/path", result: "blog.boot.dev/path" },
      { input: "http://BLOG.boot.dev/path/", result: "blog.boot.dev/path" },
      { input: "http://blog.boot.dev/path", result: "blog.boot.dev/path" },
    ];
    for (const opt of cases) {
      assert.equal(normalizeURL(opt.input), opt.result);
    }
  });
  it("error flow", () => {
    const cases = [
      { input: "fakeurl", message: "bad url" },
      { input: "httpsftp?fakeurl", message: "bad url" },
    ];
    for (const opt of cases) {
      assert.throws(() => normalizeURL(opt.input), Error, opt.message);
    }
  });
});

describe(getURLsFromHTML.name, () => {
  const html = `
  <html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/articles"><span>Articles</span></a>
        <a href="/shop"><span>Shop</span></a>
    </body>
  </html>
  `;
  const base = "https://blog.boot.dev";
  it("extract all links", () => {
    const urls = getURLsFromHTML(html, base);
    assert.equal(urls.length, 3);
    assert.deepEqual(urls, [
      "https://blog.boot.dev/",
      "https://blog.boot.dev/articles",
      "https://blog.boot.dev/shop",
    ]);
  });
});
