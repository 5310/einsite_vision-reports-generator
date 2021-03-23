import { LitElement, html, css } from 'https://esm.sh/lit-element'

export default class VisionLegendConnector extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    }
  }

  constructor() {
    super()
    this.title = 'Connectors'
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

        font-family: 'Open Sans', sans-serif;
        font-size: 12px;
        line-height: 1em;
      }

      :host {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-gap: 0.25em;
        align-items: center;
      }
      :host > .title {
        padding: 0 1ch;

        text-align: center;
      }
    `
  }

  render() {
    return html`
      <div class="title"><slot></slot></div>
      <object
        class="viz"
        type="image/svg+xml"
        data="/asset/legend/connector.svg"
      ></object>
    `
  }
}

customElements.define('vision-legend-connector', VisionLegendConnector)
