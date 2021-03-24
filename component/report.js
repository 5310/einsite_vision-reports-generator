import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionReport extends LitElement {
  static get properties() {
    return {
      path: { type: String, attribute: 'data-path' },
      data: { type: Object, attribute: false },
    }
  }

  constructor() {
    super()
    this.path = '/data/template'
    this.data = undefined
    this.fetchData()
  }

  async fetchData() {
    this.data = await fetch(`${this.path}/index.json`)
      .then((response) => response.json())
      .then((json) => ({
        ...json,
        date: new Date(json.date),
        equipment: json.equipment.map((equip, index) => ({ ...equip, index })),
        path: this.path,
        name: 'Loader Comparison · Daily',
      }))
    console.log(this.data)
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
    return this.data
      ? html`
          <vision-report-page
            blank
            .data=${this.data}
            .pageNo="0"
          ></vision-report-page>

          ${this.data.equipment.map((equip, index) => {
            return html`
              <vision-report-page-zones
                .pageNo=${1 + 1 + index}
                .data=${this.data}
                .equipment=${equip}
                .trips=${this.data.trips[index]}
              ></vision-report-page-zones>
            `
          })}

          <vision-report-page
            .data=${this.data}
            .pageNo=${1 + 1 + this.data.equipment.length}
          ></vision-report-page>
        `
      : html``
  }
}

customElements.define('vision-report', VisionReport)
