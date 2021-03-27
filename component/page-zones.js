import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionReportPageZones extends LitElement {
  static get properties() {
    return {
      date: { type: Object },
      footer: { type: String },
      number: { type: Number },
      path: { type: String },
      project: { type: String },
      site: { type: String },
      name: { type: String },
      type: { type: String },
      equipment: { type: Array },
      trips: { type: Array },
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
        .title=${`Zones · ${this.equipment.id}`}
        .number=${this.number}
        .footer=${this.footer}
        .date=${this.date}
      >
        <vision-report-map
          class="map"
          .path=${this.path}
          .project=${this.project}
          .site=${this.site}
          .name=${this.name}
          .zones=${this.equipment}
          .trips=${this.trips}
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
