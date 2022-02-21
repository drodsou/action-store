
## TODO
- weak Set para autounsubscribe?
- ejemplos svelte-vite y vanilla data-bind
- tipos typescript


## Original

See:
- `createStore.js` for the base library
- `createStoreExample.js` for example store creation 

And now how to subscribe/update UI in JS / React / Svelte:


## vanilla js subscribing

```js
<button onClick="store.action.inc()"></button>

<script type="module">
  import store from 'createStoreExample.js';
  window.store = store;
  store.subscribe(({state,computed})=>{
    document.querySelector('button').innerText = state.count;
  });
</script>
```

Or more declarative/sofisticated, you can use optional `createStoreVanilla.js` helpers for autobinding


## React/preact subscribing
```js
import store from './createStoreExample'; 

constructor () {
  ...
  store.subscribe(({state,computed})=>{
    this.forceUpdate();  
  });
}
```

Or if using hooks use `createStoreReact.js`

```js
import _store from './createStoreExample';
import {useStore} from './createStoreReact';

function Component () {
  const store = useStore(_store);  // or {..._store} for independent one
  return <button onClick={()=>store.action.inc()}>{store.state.count}</button>
}
```


## Svelte subscribing

As store.subscribe function is compatible with native Svelte stores interface, nothing special is needed 
to use Svelte $ autosubscriptions, both for state and computed props:

Several .svelte files could share same common store, of course

```js
<script> import store from './createStoreExample.js'; </script>

<button on:click={()=>store.action.inc()}>{$store.state.count}</button>
<div>{@html $store.computed.countHtml()}</div>
```
