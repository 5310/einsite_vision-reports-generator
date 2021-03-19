import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'
import VisionPage from '/component/page.js'

export default class VisionPageActivity extends LitElement {
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

      :host > .map {
        grid-area: span 7 / span 14;
        grid-row-start: 4;
      }

      :host > .legend {
        grid-area: 1 / -8 / 3 / -2;
      }
    `
  }

  render() {
    return html`
      <vision-map class="map"></vision-map>
      <aside class="legend"></aside>
    `
  }
}

customElements.define('vision-page-activity', VisionPageActivity)
