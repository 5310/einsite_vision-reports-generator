import { LitElement, html, css } from 'lit-element'

export default class VisionReportPage extends LitElement {
  static get properties() {
    return {
      blank: { type: Boolean },
      title: { type: String },
      date: { type: Object },
      footer: { type: String },
      number: { type: Number },
    }
  }

  constructor() {
    super()
    this.title = 'Title'
    this.number = '#'
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

        width: var(--page-width);
        height: var(--page-height);

        display: grid;
        grid-auto-flow: column;
        grid-gap: var(--grid-gap);
        grid-template-rows: repeat(auto-fill, var(--grid-cell-height));
        grid-template-columns: repeat(auto-fill, var(--grid-cell-width));

        background: #fff;

        font-family: 'Open Sans', sans-serif;
        font-size: 14pt;
      }

      ::slotted(*) {
        grid-row-start: 3;
        grid-column: 2 / -2;
      }

      :host > header {
        grid-area: 1 / 2 / 3 / -2;
        display: flex;
        flex-flow: column;
        grid-gap: var(--grid-gap);
        justify-content: flex-end;
      }

      :host > header > .title {
        font-size: 24pt;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 0.75em;

        opacity: 0.66;
      }
      :host > header > .date {
        font-size: 14pt;
        font-weight: 500;
        line-height: 0.75em;

        opacity: 0.5;
      }

      :host > footer {
        display: contents;
        font-size: 12pt;
      }
      :host > footer > * {
        grid-row: -2 / -1;
      }
      :host > footer > .logo {
        grid-column: 2 / 3;
        width: 100%;
        margin-top: -20%;
      }
      :host > footer > .title {
        grid-column: 3 / 10;

        text-transform: uppercase;
        letter-spacing: 1px;
        opacity: 0.5;
      }
      :host > footer > .date {
        grid-column: -6 / -2;

        justify-self: end;
        opacity: 0.5;
      }
      :host > footer > .page-no {
        grid-column: -2 / -1;
        font-size: 1.75em;
        line-height: 1em;
      }
    `
  }

  render() {
    return html`
      ${this.blank
        ? ''
        : html`<header>
            <h1 class="title">${this.title}</h1>
            <h2 class="date">
              ${this.date
                .toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })
                .split(' at ')[0]
                .trim()}
            </h2>
          </header>`}
      <slot></slot>
      ${this.blank
        ? ''
        : html`<footer>
            <object
              class="logo"
              type="image/svg+xml"
              data="/asset/logo/logomark.teal.svg"
            ></object>
            </div>
            <div class="title">${this.footer}</div>
            <div class="date">
              ${this.date
                .toLocaleString('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })
                .split(' at ')[0]
                .split(',')
                .slice(1)
                .join(',')
                .trim()}
            </div>
            <div class="page-no">${this.number}</div>
          </footer>`}
    `
  }
}

customElements.define('vision-report-page', VisionReportPage)
