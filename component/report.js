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
      }))
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
          <vision-report-page-cover
            blank
            .path=${this.data.path}
            .project=${this.data.project}
            .site=${this.data.site}
            .title=${this.data.name}
            .equipment=${this.data.equipment}
          ></vision-report-page-cover>

          ${this.data.pages.flatMap((page) => {
            switch (page.type) {
              case 'zones':
                return page.equipment.map(
                  (equipmentIndex) => html`
                    <vision-report-page-zones
                      .path=${this.data.path}
                      .project=${this.data.project}
                      .site=${this.data.site}
                      .name=${page.name}
                      .type=${page.type}
                      .equipment=${this.data.equipment[equipmentIndex]}
                      .trips=${page.trips[equipmentIndex]}
                    ></vision-report-page-zones>
                  `,
                )
              case 'plants':
                return html`
                  <vision-report-page-plants
                    .path=${this.data.path}
                    .project=${this.data.project}
                    .site=${this.data.site}
                    .name=${page.name}
                    .type=${page.type}
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
      page.number = 1 + index
      page.footer = this.data.name
      page.date = this.data.date
    })
  }
}

customElements.define('vision-report', VisionReport)
