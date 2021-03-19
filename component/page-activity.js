import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionReportPageActivity extends LitElement {
  static get properties() {
    return {
      reportName: { type: String, attribute: 'report-name' },
      date: { type: Object },
      pageTitle: { type: String, attribute: 'page-title' },
      pageNo: { type: Number, attribute: 'page-no' },
    }
  }

  constructor() {
    super()
    this.reportName = 'Report Template'
    this.date = 'Weekday, Mon D, Year'
    this.pageTitle = 'Title'
    this.pageNo = '#'
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :host {
        --page-width: 8.5in;
        --page-height: 11in;
        --grid-gap: 10px;
        --grid-rows: 15;
        --grid-columns: 14;
        --grid-cell-width: 49px;
        --grid-cell-height: 61px;

        display: contents;

        font-family: 'Open Sans', sans-serif;
        font-size: 14pt;
      }

      h1 {
        font-size: 18pt;
        font-weight: 700;
        text-transform: uppercase;
      }
      h2 {
        font-size: 14pt;
        font-weight: 700;
        text-transform: uppercase;
      }

      vision-report-page > .map {
        grid-area: span 7 / span 14;
        grid-row-start: 4;
      }

      vision-report-page > .legend {
        grid-area: 1 / -8 / 3 / -2;
      }
    `
  }

  render() {
    return html`
      <vision-report-page
        .reportName=${this.reportName}
        .date=${this.date}
        .pageTitle=${this.pageTitle}
        .pageNo=${this.pageNo}
      >
        <vision-report-map class="map"></vision-report-map>
        <aside class="legend"></aside>
      </vision-report-page>
    `
  }
}

customElements.define('vision-report-page-activity', VisionReportPageActivity)
