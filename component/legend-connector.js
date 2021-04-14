import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

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
        margin-bottom: -0.75em;

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
