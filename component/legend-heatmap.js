import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionLegendHeatmap extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      min: { type: String },
      max: { type: String },
      swatch: { type: String },
    }
  }

  constructor() {
    super()
    this.title = 'Heatmap'
    this.min = 'Least'
    this.max = 'Most'
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
        grid-area: 1 / 1 / 2 / -1;

        text-align: center;

        padding: 0 1ch;
      }
      :host > :where(.viz, .label.min, .label.max) {
        grid-area: 2 / 1 / -1 / -1;
      }
      :host > .label {
        padding: 0 1ch;

        font-size: 0.9em;
        font-weight: 700;
        text-transform: uppercase;

        color: white;
      }
      :host > .label.max {
        justify-self: end;
      }
      :host > .viz {
        height: 2em;
        border-radius: 0.8em;

        align-self: stretch;

        background-size: cover;
      }
    `
  }

  render() {
    return html`
      <div class="title">
        <slot></slot>
      </div>
      <div class="viz" style="background-image: url(${this.swatch})"></div>
      <span class="label min">${this.min}</span>
      <span class="label max">${this.max}</span>
    `
  }
}

customElements.define('vision-legend-heatmap', VisionLegendHeatmap)
