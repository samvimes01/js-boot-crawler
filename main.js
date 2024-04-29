import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

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

  const pages = await crawlPage(baseUrl);
  printReport(pages)
}

main();
