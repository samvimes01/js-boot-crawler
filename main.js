import { crawlPage } from './crawl.js'

async function main() {
  if (process.argv.length < 3) {
    console.error("missing base url argument")
    process.exit(1)
  }
  if (process.argv.length > 3) {
    console.error("wrong number of arguments")
    process.exit(2)
  }
  const baseUrl = process.argv[2]
  console.log("started crawling urls at", baseUrl)

  await crawlPage(baseUrl);
}

main();
