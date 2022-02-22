customElements.define("x-count1", class extends HTMLElement {

  constructor () {
    super();
    this.attachShadow({ mode : 'open' });   // if using shadow
    this.root = this.shadowRoot ? this.shadowRoot : this; // both shadow and normal;

    this.template = props => `
      <button s-action="click:inc" s-data="style.backgroundColor:computed.color:orange:teal">
        C1 <span s-data="innerText:state.count"></span>
      </button>
    `;
    
    this.attributeChangedCallback();
  }

  // static get observedAttributes() { return ['attr'] };

  attributeChangedCallback (attr, oldValue, newValue) {
    this.root.innerHTML = this.template(newValue);
  }

});
