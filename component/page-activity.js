import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionReportPageActivity extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
      equipment: { type: Object },
      trips: { type: Object },
      pageNo: { type: Number, attribute: 'page-no' },
    }
  }

  constructor() {
    super()
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

        --color-purple: #a749f0;
        --color-red: #ee2864;
        --color-orangered: #ee6870;
        --color-orange: #f08f49;
        --color-yellow: #ffb800;
        --color-green: #62dd77;
        --color-cyan: #25c9c9;
        --color-blue: #4a90e2;
        --color-purpleblue: #625fe4;

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
        .data=${this.data}
        .pageTitle=${`Activity Map – ${this.equipment.id}`}
        .pageNo=${this.pageNo}
      >
        <vision-report-map
          class="map"
          .data=${this.data}
          .dataPath=${this.data.path}
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

          <vision-legend-heatmap background="/asset/legend/oceanic.medium.png">
            Time spent <strong>active</strong> <br />through the day
          </vision-legend-heatmap>

          <vision-legend-heatmap background="/asset/legend/flame.png">
            Time spent <strong>idle</strong> <br />through the day
          </vision-legend-heatmap>
        </aside>
      </vision-report-page>
    `
  }
}

customElements.define('vision-report-page-activity', VisionReportPageActivity)
