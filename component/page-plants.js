import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

const palette = ['cyan', 'blue', 'purpleblue', 'purple']

export default class VisionReportPagePlants extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
      equipment: { type: Array },
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
        .pageTitle=${'Plants'}
        .pageNo=${this.pageNo}
      >
        <vision-report-map
          class="map"
          .data=${this.data}
          .dataPath=${this.data.path}
          .plants="true"
        ></vision-report-map>

        <aside class="legend">
          ${this.equipment.map((equipment, index) => {
            return html`
              <vision-legend-box swatch="/asset/legend/${palette[index]}.png">
                CY loaded by <br /><strong>${equipment.id}</strong>
              </vision-legend-box>
            `
          })}
        </aside>
      </vision-report-page>
    `
  }
}

customElements.define('vision-report-page-plants', VisionReportPagePlants)
