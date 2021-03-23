import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionReportPageActivity extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
      equipment: { type: Object },
      trips: { type: Object },
      pageNo: { type: Number, attribute: 'page-no' },
    }
  }

  constructor() {
    super()
    this.pageNo = '#'
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

      vision-report-page > .map {
        grid-area: 4 / 1 / span 7 / span 14;
      }

      vision-report-page > .legend {
        grid-area: 3 / 2 / span 1 / span 12;

        display: flex;
        grid-gap: var(--grid-gap);
        justify-content: flex-end;
        align-items: center;

        font-size: 12px;
        line-height: 1em;
      }

      vision-report-page > .legend > .heatmap {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-gap: 0.25em;
        align-items: center;
      }
      vision-report-page > .legend > .heatmap > .title {
        grid-area: 1 / 1 / 2 / -1;

        text-align: center;

        padding: 0 1ch;
      }
      vision-report-page
        > .legend
        > .heatmap
        > :where(.viz, .label.min, .label.max) {
        grid-area: 2 / 1 / -1 / -1;
      }
      vision-report-page > .legend > .heatmap > .label {
        padding: 0 1ch;

        font-size: 0.9em;
        font-weight: 700;
        text-transform: uppercase;

        color: white;
      }
      vision-report-page > .legend > .heatmap > .label.max {
        justify-self: end;
      }
      vision-report-page > .legend > .heatmap > .viz {
        height: 2em;
        border-radius: 0.8em;

        align-self: stretch;

        background-size: cover;
      }
      vision-report-page > .legend > .heatmap.active > .viz {
        background-image: url('/asset/legend/oceanic.medium.png');
      }
      vision-report-page > .legend > .heatmap.idle > .viz {
        background-image: url('/asset/legend/flame.png');
      }

      vision-report-page > .legend > .pie {
        display: flex;
        grid-gap: 0.25em;
        justify-content: flex-end;
        align-items: center;
      }
      vision-report-page > .legend > .pie.active > .viz .pie {
        fill: var(--color-green);
      }
      vision-report-page > .legend > .pie.idle > .viz .pie {
        fill: var(--color-red);
      }

      vision-report-page > .legend > .connector {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 1fr;
        grid-gap: 0.25em;
        align-items: center;
      }
      vision-report-page > .legend > .connector > .title {
        padding: 0 1ch;

        text-align: center;
      }
    `
  }

  render() {
    return html`
      <vision-report-page
        .data=${this.data}
        .pageTitle=${`Activity Map – ${this.equipment.id}`}
        .pageNo=${this.pageNo}
      >
        <vision-report-map
          class="map"
          .data=${this.data}
          .dataPath=${this.data.path}
          .zones=${this.equipment}
          .trips=${this.trips}
        ></vision-report-map>
        <aside class="legend">
          <section class="connector trips">
            <div class="title">No. of Trips</div>
            <object
              class="viz"
              type="image/svg+xml"
              data="/asset/legend/connector.svg"
            ></object>
          </section>

          <section class="pie active">
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
                    <dc:type
                      rdf:resource="http://purl.org/dc/dcmitype/StillImage"
                    />
                    <dc:title></dc:title>
                  </cc:Work>
                </rdf:RDF>
              </metadata>
              <g id="g6">
                <path
                  style="stroke-width:1.05833;paint-order:stroke fill markers"
                  class="pie"
                  d="M 11.849261,9.5249999 A 6.3499999,6.3499999 0 0 1 4.7064989,12.483629 6.3499999,6.3499999 0 0 1 1.2286101e-8,6.3499997 6.3499999,6.3499999 0 0 1 4.7064991,0.21637099 6.3499999,6.3499999 0 0 1 11.849261,3.1749999 l -5.4992611,3.175 z"
                  id="path4"
                />
              </g>
            </svg>

            <div class="title">
              Hours spent <br /><strong>active</strong> <br />at the zone
            </div>
          </section>
          <section class="pie idle">
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
                    <dc:type
                      rdf:resource="http://purl.org/dc/dcmitype/StillImage"
                    />
                    <dc:title></dc:title>
                  </cc:Work>
                </rdf:RDF>
              </metadata>
              <g id="g6">
                <path
                  style="stroke-width:1.05833;paint-order:stroke fill markers"
                  class="pie"
                  d="M 11.849261,9.5249999 A 6.3499999,6.3499999 0 0 1 4.7064989,12.483629 6.3499999,6.3499999 0 0 1 1.2286101e-8,6.3499997 6.3499999,6.3499999 0 0 1 4.7064991,0.21637099 6.3499999,6.3499999 0 0 1 11.849261,3.1749999 l -5.4992611,3.175 z"
                  id="path4"
                />
              </g>
            </svg>

            <div class="title">
              Hours spent <br /><strong>idle</strong> <br />at the zone
            </div>
          </section>

          <section class="heatmap active">
            <div class="title">
              Time spent <strong>active</strong> <br />through the day
            </div>
            <div class="viz"></div>
            <span class="label min">Least</span>
            <span class="label max">Most</span>
          </section>

          <section class="heatmap idle">
            <div class="title">
              Time spent <strong>idle</strong> <br />through the day
            </div>
            <div class="viz"></div>
            <span class="label min">Least</span>
            <span class="label max">Most</span>
          </section>
        </aside>
      </vision-report-page>
    `
  }
}

customElements.define('vision-report-page-activity', VisionReportPageActivity)
