export function printReport(pages) {
  const sorted = Object.entries(pages).sort((a,b) => b[1] - a[1])
  console.log("=========================================================")
  console.log("=======================START REPORT======================")
  for (const page of sorted) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`);
  }
  console.log("=========================================================")
}