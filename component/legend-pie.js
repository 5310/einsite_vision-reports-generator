import { LitElement, html, css } from 'https://esm.sh/lit-element'

export default class VisionLegendPie extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      color: { type: String },
    }
  }

  constructor() {
    super()
    this.title = 'Pie wedge'
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
        grid-gap: 0.25em;
        justify-content: flex-end;
        align-items: center;
      }
    `
  }

  render() {
    return html`
      <svg
        class="viz"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 12.7 12.7"
        version="1.1"
        id="svg8"
      >
        <defs id="defs2" />
        <metadata id="metadata5">
          <rdf:RDF>
            <cc:Work rdf:about="">
              <dc:format>image/svg+xml</dc:format>
              <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
              <dc:title></dc:title>
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <g>
          <path
            class="pie"
            style="fill:${this
              .color}; stroke-width:1.05833;paint-order:stroke fill markers"
            d="M 11.849261,9.5249999 A 6.3499999,6.3499999 0 0 1 4.7064989,12.483629 6.3499999,6.3499999 0 0 1 1.2286101e-8,6.3499997 6.3499999,6.3499999 0 0 1 4.7064991,0.21637099 6.3499999,6.3499999 0 0 1 11.849261,3.1749999 l -5.4992611,3.175 z"
            id="path4"
          />
        </g>
      </svg>

      <div class="title">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('vision-legend-pie', VisionLegendPie)
