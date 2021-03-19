import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionReport extends LitElement {
  static get properties() {
    return {
      datasetPath: { type: String, attribute: 'dataset-path' },
    }
  }

  constructor() {
    super()
    this.datasetPath = '/data/template/index.json'
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
    return html`
      <vision-report-page blank></vision-report-page>
      <vision-report-page-activity page-no="1"></vision-report-page-activity>
      <vision-report-page-activity page-no="2"></vision-report-page-activity>
      <vision-report-page-activity page-no="3"></vision-report-page-activity>
      <vision-report-page page-no="4"></vision-report-page>
    `
  }
}

customElements.define('vision-report', VisionReport)
