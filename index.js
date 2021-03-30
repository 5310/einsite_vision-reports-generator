const http = require('http')
const parseUrl = require('parseurl')
const send = require('send')
const puppeteer = require('puppeteer')
const sleep = require('sleep-promise')

const PORT = 5000
const PATH = process.argv[2] ?? '/data/template'
const RENDER_DELAY = 2
const DEFAULT_TITLE = 'Einsite Vision · Daily Report'

const server = http.createServer((req, res) => {
  send(req, parseUrl(req).pathname, { root: './' }).pipe(res)
})

;(async () => {
  console.info(`Starting temporary fileserver at port ${PORT}...`)
  server.listen(PORT)

  console.info('Launching Puppeteer...')
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  console.info(`Attempting to load report from ${PATH}...`)
  await page.goto(`http://localhost:${PORT}?path=${PATH}`)
  await sleep(RENDER_DELAY * 1000)

  const title = await page.title()

  if (title === DEFAULT_TITLE) {
    console.error(`Failed to load report from ${PATH}`)
    process.exit(1)
  }

  console.info(`Printing...\n  ${title}.pdf`)
  await page.pdf({
    path: `${title}.pdf`,
    scale: 1,
    displayHeaderFooter: false,
    printBackground: true,
    landscape: false,
    format: 'Letter',
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  })

  await browser.close()

  await server.close()

  console.info('Done')
})()
