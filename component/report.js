import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionReport extends LitElement {
  static get properties() {
    return {
      dataPath: { type: String, attribute: 'data-path' },
      data: { type: Object, attribute: false },
      reportName: { type: String, attribute: false },
    }
  }

  constructor() {
    super()
    this.dataPath = '/data/template'
    this.data = undefined
    this.reportName = 'Loader Comparison · Daily'
    this.fetchData()
  }

  async fetchData() {
    this.data = await fetch(`${this.dataPath}/index.json`)
      .then((response) => response.json())
      .then((json) => ({
        ...json,
        equipment: json.equipment.map((equip, index) => ({ ...equip, index })),
        path: this.dataPath.split('/').slice(0, -1).join('/'),
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
          <vision-report-page
            blank
            .reportName=${this.reportName}
          ></vision-report-page>

          ${this.data.equipment.map((equip, index) => {
            return html`
              <vision-report-page-activity
                .pageNo=${1 + 1 + index}
                .dataPath=${this.dataPath}
                .equipment=${equip}
                .trips=${this.data.trips[index]}
                .date=${this.data.date}
                .reportName=${this.reportName}
              ></vision-report-page-activity>
            `
          })}

          <vision-report-page
            .pageNo=${1 + 1 + this.data.equipment.length}
            .reportName=${this.reportName}
          ></vision-report-page>
        `
      : html``
  }
}

customElements.define('vision-report', VisionReport)
