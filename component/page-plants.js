import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

const palette = ['cyan', 'blue', 'purpleblue', 'purple']

export default class VisionReportPagePlants extends LitElement {
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
      subtitle: { type: String },
      equipment: { type: Array },
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

      vision-report-page > .notes {
        grid-area: auto / 2 / span 3 / -2;
      }
      vision-report-page > .notes > h1 {
        margin-top: 1em;
        margin-bottom: var(--grid-gap);
        opacity: 0.8;
      }
      vision-report-page > .notes > ul {
        display: grid;
        grid-gap: var(--grid-gap);
        grid-column-gap: calc(var(--grid-gap) * 2);
        grid-template-columns: auto 1fr;
      }
      vision-report-page > .notes > ul > li {
        display: contents;
      }
      vision-report-page > .notes > ul > li > dl {
        font-weight: 700;
      }
    `
  }

  render() {
    return html`
      <vision-report-page
        .title="Plants · ${this.subtitle}"
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
          plants
        ></vision-report-map>

        <div class="notes">
          <h1>Bucket Capacity</h1>
          <ul>
            ${this.equipment.map(
              (equip) => html`<li>
                <dl>${equip.id}</dl>
                <dd>${equip.capacity}</dd>
              </li>`,
            )}
          </ul>
        </div>

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
