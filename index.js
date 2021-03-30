const http = require('http')
const parseUrl = require('parseurl')
const send = require('send')
const puppeteer = require('puppeteer')
const sleep = require('sleep-promise')

const PORT = 5000
const PATH = process.argv[2] ?? '/data/template'
const RENDER_DELAY = 2

const server = http.createServer((req, res) => {
  send(req, parseUrl(req).pathname, { root: './' }).pipe(res)
})

;(async () => {
  server.listen(PORT)

  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}?path=${PATH}`)
  await sleep(RENDER_DELAY * 1000)

  await page.pdf({
    path: `${await page.title()}.pdf`,
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
})()
