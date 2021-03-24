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
          <vision-report-page blank .data=${this.data}></vision-report-page>

          ${this.data.pages.flatMap((page) => {
            switch (page.type) {
              case 'zones':
                return page.equipment.map(
                  (equipmentIndex) => html`
                    <vision-report-page-zones
                      .data=${this.data}
                      .equipment=${this.data.equipment[equipmentIndex]}
                      .trips=${page.trips[equipmentIndex]}
                    ></vision-report-page-zones>
                  `,
                )
              case 'plants':
                return html`
                  <vision-report-page-plants
                    .data=${this.data}
                    .name=${page.name}
                    .subtitle=${page.subtitle}
                    .equipment=${page.equipment.map(
                      (equipmentIndex) => this.data.equipment[equipmentIndex],
                    )}
                  ></vision-report-page-plants>
                `
              default:
                return ''
            }
          })}
        `
      : html``
  }

  updated(changedProperties) {
    Array.from(this.shadowRoot.children).forEach((page, index) => {
      page.pageNo = 1 + index
    })
  }
}

customElements.define('vision-report', VisionReport)
