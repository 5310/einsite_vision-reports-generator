import { LitElement, html, css } from 'lit-element'

export default class VisionReportMap extends LitElement {
  static get properties() {
    return {
      report: { type: Object },
      pageId: { type: String },
      equipmentId: { type: Number },
      plants: { type: Boolean },
      zones: { type: Boolean },
      trips: { type: Boolean },
      cover: { type: Boolean },
    }
  }

  constructor() {
    super()
    this.pageId = undefined
    this.equipmentId = undefined
    this.plants = undefined
    this.zones = undefined
    this.trips = undefined
    this.MapElement = undefined
  }

  async importMap() {
    this.MapElement = (
      await import(
        /* webpackMode: "eager" */ `/asset/map/${this.report.project}/${this.report.site}/map.js`
      )
    ).default
    try {
      customElements.define('vision-report-map-element', this.MapElement)
    } catch (e) {
      if (
        e.message !==
        `Failed to execute 'define' on 'CustomElementRegistry': the name "vision-report-map-element" has already been used with this registry`
      )
        throw e
    }
    await this.requestUpdate()
  }

  connectedCallback() {
    super.connectedCallback()
    this.importMap()
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
        font-size: 14pt;
      }
    `
  }

  render() {
    if (this.MapElement) {
      return html`
        <vision-report-map-element
          .report=${this.report}
          .pageId=${this.pageId}
          .equipmentId=${this.equipmentId}
          .plants=${this.plants}
          .zones=${this.zones}
          .trips=${this.trips}
          .cover=${this.cover}
        >
        </vision-report-map-element>
      `
    } else {
      return ''
    }
  }
}

customElements.define('vision-report-map', VisionReportMap)
