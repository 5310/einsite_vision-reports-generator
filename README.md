# Vision Reports Generator

This is a web-based reports generator for Einsite Vision.

Initially the Vision reports were generated by hand using Google Slides in order to make it easier for people to collaborate on editing it while we iterated the design and content, with the intent that the entire process would be automated once they stabilized.

This generator was made for the web simply because it is far easier to design and generate documents in the browser and then printed to PDFs than to script bulk image overlays with Python on top of the far rougher-around-the-edge reports produced from Google Slides due to its inherent limitations as a content production tool.

## Usage

In order to generate an implemented report, first populate its data under `/data/` and then follow the rest—

### Using the Included Node.js Script

1. In order to use the included Node.js based script that generates reports directly first open a terminal on the generator root
2. Install the dependencies as a one-time step: `$ npm install`
3. Run the script as needed: `$ npm start `/data/<project>/<site>/<target-data-folder>`

- By convention the data folder with visualizations and the `index.json` files should be stored as per this example
- But as long as it is stored anywhere under the root directory it can be read and generated

### Only Using the Static Web-based Generator

1. Run a static fileserver on the project's root

- The generator itself operates entirely on the browser and does not Node.js or any specific serverside software to work
- However, it does need a static fileserver to be able to load its dependencies

2. Open the page and point it to a data folder using the `path` URL parameter, e.g: `localhost:5000?path=/data/<project>/<site>/<target-data-folder>`
3. Wait 5 seconds for the report to fully generate, and then print

Note: Please use standards compliant modern browser such as Chrome or Firefox while generating the report. For automation [Puppeteer](https://pptr.dev/)—which uses headless Chrome—has Python bindings available called [Pyppeteer](https://pypi.org/project/pyppeteer/).

###

## Current State

At the moment the generator has all the assets setup to generate daily reports for Canyon Rock · Forestville.

We have however retained the style and dimensions we settled onto for the data visualizations produed in Python and then added to the Slides reports while they were updated manually to reduce migration efforts. These data visualizations will need ot be named and organized in a standard manner and then supplied to the generator as path for it to then produce the actual report. Template examples of this has been inclided. Alongside these data visualizations, a JSON index containing page configuration and manifest data would also need to be generated; with added example and JSON Schema for validation.

Further iterations to the design can now be ported directly to this project from Figma concepts.

## Future Changes

- Additional page types can be added as web-components for the reports for future wider use.
- The generator currently targets PDF generation and not for browser use at the moment
  - It makes no effort to optimize performance for the browser-readable version that then gets printed.
  - It also makes no efforts to support dated or non-standards compliant browsers, targeting the latest versions of Chrome and Firefox for the time being.
  - Currently the included PDF printing script uses [Puppeteer](https://pptr.dev/) and therefore headless Chrome, but the intent is that this step will be performed with the Python process that will collate dailty data and generate data visualizations.

## Development

- This project generates reports using the standard web and requires no tooling
  - It requires modern JavaScript and browser features such as `import` statements, the `??` operator, and WebComponents
  - It does make use of the [Lit-Element](https://lit-element.polymer-project.org/) library for authoring the custom elements it uses, and imports it through the [Skypack CDN](https://www.skypack.dev/)
    - This can certainly be cached offline if required
- The optional PDF generator script does depend on [Node.js](https://nodejs.org/en/); v15 or higher
- The project is linted using [Prettier](https://prettier.io/)
