import { describe, it } from "node:test";
import assert from "node:assert";

import { normalizeURL } from "./crawl.js";

describe(normalizeURL.name, () => {
  it('normal flow', () => {
    const cases = [
      {input: "https://blog.boot.dev/path/", result: "blog.boot.dev/path", },
      {input: "https://blog.boot.dev/path", result: "blog.boot.dev/path", },
      {input: "http://BLOG.boot.dev/path/", result: "blog.boot.dev/path", },
      {input: "http://blog.boot.dev/path", result: "blog.boot.dev/path", },
    ]
    for (const opt of cases) {
      assert.equal(normalizeURL(opt.input), opt.result)
    }
  })
  it('error flow', () => {
    const cases = [
      {input: "fakeurl", message: "bad url", },
      {input: "httpsftp?fakeurl", message: "bad url", },
    ]
    for (const opt of cases) {
      assert.throws(() => normalizeURL(opt.input), Error, opt.message)
    }
  })
})