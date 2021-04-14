import { LitElement, html, css } from 'lit-element'

export default class VisionLegendBox extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      color: { type: String },
      swatch: { type: String },
    }
  }

  constructor() {
    super()
    this.title = 'Box'
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
        display: flex;
        grid-gap: 0.5em;
        justify-content: flex-end;
        align-items: center;
      }

      :host > .viz {
        width: 2.5em;
        height: 2.5em;
        background-size: 10em 10em;
      }
    `
  }

  render() {
    return html`
      <div
        class="viz"
        style="
          background-color: ${this.color};
          background-image: url(${this.swatch})
        "
      ></div>
      <div class="title">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('vision-legend-box', VisionLegendBox)
