
// -- optional additional automatic subscriptions and action listeners for vanilla javascript

// -- use: store.subscribe(dataBindSubscriptions);
// -- eg: <button data-bind="innerText:state.count; style.color:computed.color:yellow:green"></button>
// -- eg: <ul data-bind="innerHTML:computed.list:3"></ul>
// -- in 'data' is passed both state and computed from store
export function dataBindSubscriptions ( data) {
  for (let e of document.querySelectorAll(`[data-bind]`)) {
    for (let part of e.dataset.bind.split(';')) {
      const [target, source, ...args] = part.trim().split(':');
      if (!target) { continue; }
      let render = new Function('e','data','args', 
        source.includes('state.') ? `e.${target} = data.${source}` : `e.${target} = data.${source}(...args)`
      );
      try { render(e, data, args) }
      catch (e) { console.error(`ERROR: Not found data-bind: ${target}:${source}`); console.log(e)}
    }
  }
});


// -- auto add event listeners (once), if global window.app / window.store is not wanted
// -- use: addActionListenersDataOn(store);
// -- eg: <button data-on="click:inc"></button>
export function addActionListenersDataOn (store) {
  for (let e of document.querySelectorAll(`[data-on]`)) {
    for (let part of e.dataset.on.split(';')) {
      const [event, action,...args] = part.trim().split(':');
      if (!event) { continue; }
      try { e.addEventListener(event, ()=>store.action[action](...args)) } 
      catch (e) { console.error(`ERROR: data-on: ${event}:${action}:${args}`); }
    }
  }
}