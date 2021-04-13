import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'
import '/component/page-cover.js'
import '/component/page-zones.js'
import '/component/page-plants.js'

export default class VisionReport extends LitElement {
  constructor() {
    super()
    this.path =
      new URLSearchParams(location.search).get('path') ?? '/data/template'
    this.report = undefined
    this.fetchData()
  }

  async fetchData() {
    this.report = await fetch(`${this.path}/index.json`)
      .then((response) => response.json())
      .then((json) => ({
        ...json,
        date: new Date(json.date),
        equipment: json.equipment.map((equip, index) => ({ ...equip, index })),
        path: this.path,
      }))
      .catch((err) => console.error(`Failed to load data from ${this.path}`))
    await this.requestUpdate()
  }

  static get styles() {
    return css`
      :host {
        --page-width: 8.5in;
        --page-height: 11in;
        --grid-gap: 10px;
        --grid-rows: 15;
        --grid-columns: 14;
        --grid-cell-width: 49px;
        --grid-cell-height: 61px;

        font-family: 'Open Sans', sans-serif;
        font-size: 14pt;
      }

      @media screen {
        :host {
          padding: 8em;

          display: grid;
          grid-gap: 4em;
          justify-content: center;
        }
      }
    `
  }

  render() {
    if (this.report) {
      document.title = `${this.report.project} · ${
        this.report.site
      } — ${this.report.date.toISOString().slice(0, 10)}`
      return html`
        <vision-report-page-cover
          .report=${this.report}
        ></vision-report-page-cover>

        ${this.report.pages.map((page) => {
          switch (page.type) {
            case 'zones':
              return html`
                <vision-report-page-zones
                  .report=${this.report}
                  .page=${page}
                ></vision-report-page-zones>
              `
            case 'plants':
              return html`
                <vision-report-page-plants
                  .report=${this.report}
                  .page=${page}
                ></vision-report-page-plants>
              `
            default:
              return ''
          }
        })}
      `
    } else {
      return ''
    }
  }

  updated(changedProperties) {
    Array.from(this.shadowRoot.children).forEach((page, index) => {
      page.number = 1 + index
    })
  }
}

customElements.define('vision-report', VisionReport)
