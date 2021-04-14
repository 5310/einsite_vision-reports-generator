import { LitElement, html, css } from 'lit-element'
import '/component/page.js'
import '/component/map.js'
import '/component/legend-connector.js'
import '/component/legend-pie.js'
import '/component/legend-heatmap.js'

export default class VisionReportPageZones extends LitElement {
  static get properties() {
    return {
      number: { type: Number },
      report: { type: Object },
      page: { type: Object },
    }
  }

  constructor() {
    super()
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
        grid-area: 4 / 1 / span 7 / span 14;
      }

      vision-report-page > .legend {
        grid-area: 3 / 2 / span 1 / span 12;

        display: flex;
        grid-gap: var(--grid-gap);
        justify-content: flex-end;
        align-items: center;

        font-size: 12px;
        line-height: 1em;
      }
    `
  }

  render() {
    return html`
      <vision-report-page
        .title=${`Zones · ${this.report.equipment[this.page.equipment].id}`}
        .footer=${this.report.name}
        .date=${this.report.date}
        .number=${this.number}
      >
        <vision-report-map
          class="map"
          .report=${this.report}
          .equipmentId=${this.page.equipment}
          zones
          trips
        ></vision-report-map>

        <aside class="legend">
          <vision-legend-connector>
            No. of <strong>trips</strong>
          </vision-legend-connector>

          <vision-legend-pie color="#62dd77">
            Hours spent <br /><strong>active</strong> <br />within zone
          </vision-legend-pie>

          <vision-legend-pie color="#ee2864">
            Hours spent <br /><strong>idle</strong> <br />within zone
          </vision-legend-pie>

          <vision-legend-heatmap swatch="/asset/legend/oceanic.medium.png">
            Time spent <strong>active</strong> <br />through the day
          </vision-legend-heatmap>

          <vision-legend-heatmap swatch="/asset/legend/flame.png">
            Time spent <strong>idle</strong> <br />through the day
          </vision-legend-heatmap>
        </aside>
      </vision-report-page>
    `
  }
}

customElements.define('vision-report-page-zones', VisionReportPageZones)
