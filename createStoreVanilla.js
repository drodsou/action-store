
// -- optional additional automatic subscriptions and action listeners for vanilla javascript

/**
 * querySelectorAll but also inside shadowRoot
*/
function getAllAttr (attr, baseEl=document, elements=[]) {
  for (let el of baseEl.querySelectorAll('*')) {
    if (el.hasAttribute(attr)) {elements.push(el); }
    if (el.shadowRoot) { getAllAttr(attr, el.shadowRoot, elements) }
  }
  return elements;
}


/**
* @example store.subscribe(subscribeSData);
* @example <button s-data="innerText:state.count; style.color:computed.color:yellow:green"></button>
* @example <ul s-data="innerHTML:computed.list:3"></ul>
* @param {state, computed} data
**/
export function subscribeSData ( data) {
  const attr = 's-data';
  for (let e of getAllAttr(attr)) {
    for (let part of e.attributes[attr].value.split(';')) {
      const [target, source, ...args] = part.trim().split(':');
      if (!target) { continue; }
      let render = new Function('e','data','args', 
        source.includes('state.') ? `e.${target} = data.${source}` : `e.${target} = data.${source}(...args)`
      );
      try { render(e, data, args) }
      catch (e) { console.error(`ERROR: Not found ${attr}: ${target}:${source}`); console.log(e)}
    }
  }
}


/**
* auto add event listeners (once), if global window.app / window.store is not wanted
* @example addActionListenerSAction(store);
* @example <button s-action="click:inc"></button>
*/

export function addEventListenerSAction (store) {
  const attr = 's-action';
  if (!store) {throw new Error(`A 'store' parameter is needed`)}
  // for (let e of document.querySelectorAll(`[${attr}]`)) {
  for (let e of getAllAttr(attr)) {
    for (let part of e.attributes[attr].value.split(';')) {
      const [event, action,...args] = part.trim().split(':');
      if (!event) { continue; }
      try { e.addEventListener(event, ()=>store.action[action](...args)) } 
      catch (e) { console.error(`ERROR: ${attr}: ${event}:${action}:${args}`); }
    }
  }
}