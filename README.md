
## TODO
- ejemplos svelte-vite y vanilla data-bind
- weak Set para autounsubscribe?
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






