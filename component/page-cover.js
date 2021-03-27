import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element'

export default class VisionReportPageCover extends LitElement {
  static get properties() {
    return {
      date: { type: Object },
      footer: { type: String },
      number: { type: Number },
      path: { type: String },
      project: { type: String },
      site: { type: String },
      equipment: { type: Array },
    }
  }

  constructor() {
    super()
    this.date = new Date()
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

        display: contents;

        font-family: 'Open Sans', sans-serif;
        font-size: 14pt;

        color: #fff;
        text-shadow: 0 8px 4px #0006;
      }

      vision-report-page {
        overflow: hidden;
      }

      vision-report-page > .map {
        grid-area: 1 / 1 / -1 / -1;
      }

      header {
        grid-area: 1 / 2 / 3 / -2;
        display: flex;
        flex-flow: column;
        grid-gap: var(--grid-gap);
        justify-content: flex-end;
      }
      header > .project-site {
        font-size: 24pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 0.75em;
      }
      header > .date {
        font-size: 18pt;
        font-weight: 500;
        line-height: 0.75em;
      }

      main {
        grid-area: 5 / 2 / -2 / -2;
        display: flex;
        flex-flow: column;
        grid-gap: var(--grid-gap);
      }
      main > .title {
        font-size: 32pt;
        font-weight: 700;
        margin-bottom: 2em;
      }
      main > section {
        display: flex;
        flex-flow: column;
        grid-gap: var(--grid-gap);
        margin-bottom: 1em;
      }
      main > section > .equipment-id {
        font-size: 18pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 0.75em;
      }
      main > section > .equipment-type {
        font-size: 14pt;
        font-weight: 500;
        line-height: 0.75em;
      }

      footer {
        grid-area: -4 / -4 / -2 / -2;
      }
    `
  }

  render() {
    return html`
      <vision-report-page
        blank
        title="${this.project} · ${this.site}"
        .number=${this.number}
        .footer=${this.footer}
        .data=${this.date}
      >
        <vision-report-map
          class="map"
          .path=${this.path}
          .project=${this.project}
          .site=${this.site}
          cover
        ></vision-report-map>
        <header>
          <h1 class="project-site">${this.project} · ${this.site}</h1>
          <h2 class="date">
            ${this.date
              .toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'short',
              })
              .split(' at ')[0]
              .trim()}
          </h2>
        </header>
        <main>
          <h1 class="title">${this.title}</h1>
          ${this.equipment.map(
            (equip) => html`<section>
              <h1 class="equipment-id">${equip.id}</h1>
              <h2 class="equipment-type">${equip.type}</h2>
            </section>`,
          )}
        </main>
        <footer>
          <object
            class="logo"
            type="image/svg+xml"
            data="/asset/logo/logo.white.svg"
          ></object>
        </footer>
      </vision-report-page>
    `
  }
}

customElements.define('vision-report-page-cover', VisionReportPageCover)
